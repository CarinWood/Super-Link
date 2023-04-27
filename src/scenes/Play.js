import Phaser from "phaser";
import Player from "../entities/Player";
import Flower from "../entities/Flower";
import Gomba from "../entities/Gomba";
import HealthBar from "../health/HealthBar";
import EmptyBar from "../health/emptyBar";
import Spikey from "../entities/Spikey";
import Coin from "../entities/Coin";
import BlinkingCoin from "../entities/BlinkingCoin";
import EventEmitter from "../events/EventEmitter";
import ClingVine from "../entities/Clingvine";
import Questionbox from "../entities/Questionbox";




let hits = 0;
const healthX = 240;
const healthY = 130


class Play extends Phaser.Scene {

    constructor(config) {
        super('Play')
        this.config = config;
        this.healthBar1 = null;
        this.healthBar2 = null;
        this.healthBar3 = null;
        this.healthBar4 = null;
    }


    preload() {
        this.load.image('bg_night', './assets/backgrounds/pixelsky.png');
    }

 

    create() {
         this.background = this.add.tileSprite(0, 400, this.config.width, 250, "bg_night")
         .setOrigin(0, 0)
         .setScrollFactor(0, 1)

        this.score = 0;
        //Get map and tilesets:
        const map = this.make.tilemap({key: 'map'})
        const tileset1 = map.addTilesetImage('OverWorld', 'tiles-1')
        const tileset2 = map.addTilesetImage('Castle', 'tiles-2')
        const tileset3 = map.addTilesetImage('clingvine', 'tiles-3')
        const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'));
        const FlowerZone1 = this.getFlowerZone1(map.getObjectLayer('enemy_spawns'));
        const flowerZone2 = this.getFlowerZone2(map.getObjectLayer('flower2_spawn'))
        const spikeyZone = this.getSpikeyZone(map.getObjectLayer('spikey_spawn'))
        const enemySpawns = map.getObjectLayer('enemy_spawns')
        const gombaSpawn = map.getObjectLayer('gomba_spawn')
        const coinSpawns = map.getObjectLayer('collectables')
        const coins = this.createCoins(coinSpawns);
        this.scoreText = this.add.text(380, 125, 'X ' + this.score, {fontSize: '12px', fill: '#FFF', fontFamily: 'PressStart2P'})
        this.scoreText.setScrollFactor(0,0);  
        const blinkingCoin = new BlinkingCoin(this, 360, 138);
        blinkingCoin.setScrollFactor(0,0)
        this.createGameEvents();
        const square = this.add.graphics();
        square.fillStyle(0x000000);
        square.fillRect(1500, 560, 40, 50);
        this.clingvine = new ClingVine(this, 871, 290)

        

       
       

       
    
     

        
        //Get layers:
        const environment = map.createStaticLayer('environment', [tileset1, tileset2]);
        const platforms = map.createStaticLayer('platforms', [tileset1]);
    
       
 
        //Create player and enemies:
        this.player = new Player(this, playerZones.start.x, playerZones.start.y).setScale(1.2)
        this.questionbox = new Questionbox(this, 1092, 110);
        this.gomba = this.createGomba(gombaSpawn);
        this.flower1 = new Flower(this, FlowerZone1.start.x, FlowerZone1.start.y) ;
        this.flower2 = new Flower(this, flowerZone2.start.x, flowerZone2.start.y) ;
        this.displayHealth(healthX, healthY, hits )
        this.spikey = new Spikey(this, spikeyZone.start.x, spikeyZone.start.y)
       
  
        //colliders:

        platforms.setCollisionByExclusion(-1, true)
   
        coins.forEach(coin => {
            this.physics.add.overlap(this.player, coin, () => {
                this.createCoinSound();
                coin.disableBody(true, true)
                this.score++;
                this.scoreText.setText('X ' + this.score);
                console.log('coins collected: ' + this.score)
            })
        })
        this.physics.add.collider(this.player, platforms)
        this.gombaCollider = this.physics.add.collider(this.gomba, platforms)
  
        
     
        this.physics.add.collider(this.flower1, platforms)
        this.physics.add.collider(this.flower2, platforms)
        this.physics.add.collider(this.spikey, platforms)
        this.physics.add.collider(this.flower1, this.player.projectiles, () => {
            this.flower1.takesHit(this.player.projectiles)
        })
        this.physics.add.collider(this.flower2, this.player.projectiles, () => {
            this.flower2.takesHit(this.player.projectiles)
        })
       
        this.physics.add.collider(this.spikey, this.player.projectiles, () => {
            this.spikey.takesHit(this.player.projectiles)
        })


        this.physics.add.collider(this.player.projectiles, this.gomba, this.gombaIsShot, null, this)
        this.physics.add.collider(this.player, this.flower1, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower2, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.spikey, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.gomba, this.onPlayerCollision, null, this)
        
        this.questionCollider = this.physics.add.collider(this.player, this.questionbox, this.smashQuestionBox, null, this)
 
       
        this.physics.add.overlap(this.player, this.clingvine, this.onVineOverlap, null, this);
      








       
      

      

        //Cameras:
        this.setupFollowCamera(this.player);

        this.createEndOfLevel(playerZones.end, this.player);
       
   

    }

    update() {
  
    }

    smashQuestionBox() {
        this.createCoinSound();
        this.questionbox.releaseCoin();
        
    }
 

    createGameEvents() {
        EventEmitter.on('PLAYER_LOSE', () => {
            this.scene.stop();
            this.scene.start('GameOver')
        })
    }

    setupFollowCamera(player) {
        const {width, height, mapOffset} = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 100)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 40).setZoom(1.5);
        this.cameras.main.startFollow(player);
    }

    getPlayerZones(playerZonesLayer) {
                const playerZones = playerZonesLayer.objects;
                return {
                    start: playerZones.find(zone => zone.name === 'startZone'),
                    end: playerZones.find(zone => zone.name === 'endZone')
                }
    }

    getFlowerZone1(flowerZoneLayer) {
        const FlowerZone = flowerZoneLayer.objects;
        return {
         start: FlowerZone.find(zone => zone.name === 'Spawn')
        }     
    }
   
    getFlowerZone2(flowerZoneLayer) {
        const FlowerZone = flowerZoneLayer.objects;
        return {
         start: FlowerZone.find(zone => zone.name === 'flower2_spawn')
        }     
    }
 
    getSpikeyZone(spikeyZoneLayer) {
        const spikeyZone = spikeyZoneLayer.objects;
        return {
         start: spikeyZone.find(zone => zone.name === 'spikeySpawn')
        }     
    }

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end').setAlpha(0).setSize(5, 250).setOrigin(0.5, 2)

         const endLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            endLevelOverlap.active = false;
            console.log('player has reached the end')
        }) 
    }



    createGomba(gombaSpawnLayer) {
        return gombaSpawnLayer.objects.map(gombaSpawnPoint => {
            return new Gomba(this, gombaSpawnPoint.x, gombaSpawnPoint.y)
        })
    }

    onPlayerCollision() {
       this.player.takesHit()
       hits++;
       this.displayHealth(this.healthX, this.healthY, hits)

    }


    gombaIsShot() {
        this.gomba.forEach(gomba => {
           gomba.takesHit(this.player.projectiles);
           
          
          
        })
    }

    displayHealth(x, y, hits) {
        console.log(hits)
        if(hits === 0) {
            this.healthBar6 = new EmptyBar(this, x, y);
            this.healthBar1 = new HealthBar(this, x, y);
            this.healthBar5 = new EmptyBar(this, x + 20, y);
            this.healthBar2 = new HealthBar(this, x + 20, y);
            this.healthBar4 = new EmptyBar(this, x + 40, y);
            this.healthBar3 = new HealthBar(this, x + 40, y);
        } else if(hits === 1) {
            this.healthBar3.destroy()
        } else if (hits === 2) {
            this.healthBar2.destroy()
        } else if (hits === 3) {
            this.healthBar1.destroy()
        }
      
    }


    createCoins(collectablesLayer) {
        return collectablesLayer.objects.map(spawnPoint => {
            return new Coin(this, spawnPoint.x, spawnPoint.y)
        })
    }

    createCoinSound() {
        this.sound.add('coin_pickup', {loop: false, volume: 0.2}).play();
    }

    onVineOverlap() {
        this.player.climb();
    }
    
        
    




}

export default Play;