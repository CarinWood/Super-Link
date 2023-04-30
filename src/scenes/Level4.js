import Phaser from "phaser";
import Player from "../entities/Player";
import ClingVine from "../entities/Clingvine";
import Flower from "../entities/Flower";
import Projectiles from "../weapons/Projectiles";
import Coin from "../entities/Coin";
import Redkoopa from "../entities/Redkoopa";
import Koopa from "../entities/Koopa";
import EmptyBar from "../health/emptyBar";
import HealthBar from "../health/HealthBar";
import Flyingkoopa from "../entities/Flyingkoopa";
import EventEmitter from "../events/EventEmitter";
import BlinkingCoin from "../entities/BlinkingCoin";

let hits = 0;
const healthX = 240;
const healthY = 130

class Level4 extends Phaser.Scene {

    constructor(config) {
        super('level4')
        this.config = config;
        this.healthBar1 = null;
        this.healthBar2 = null;
        this.healthBar3 = null;
        this.healthBar4 = null;
    }


    create() {
        console.log('this is level4')
        this.score = 0;
        this.displayHealth(healthX, healthY, hits)
        const map = this.make.tilemap({key: 'level_4'})
        this.createGameEvents();

        const tileset1 = map.addTilesetImage('OverWorld', 'tiles-1')
        const tileset2 = map.addTilesetImage('Castle', 'tiles-2')
        const tileset3 = map.addTilesetImage('level2_tiles', 'tiles-3')
        const tileset4 = map.addTilesetImage('misc', 'tiles-4')


        const environment = map.createStaticLayer('environment', [tileset1, tileset2]);
        const platforms = map.createStaticLayer('platforms', [tileset1, tileset3, tileset4]);
        platforms.setCollisionByExclusion(-1, true)
        const koopaSpawns = map.getObjectLayer('koopa_spawns')
        const flyingKoopaSpawns = map.getObjectLayer('flying_koopa_spawns')

        //zones
        const FlowerZone1 = this.getFlowerZone1(map.getObjectLayer('enemy_spawns'));
        const flowerZone2 = this.getFlowerZone2(map.getObjectLayer('flower2_spawn'))
        const flowerZone3 = this.getFlowerZone3(map.getObjectLayer('flower3_spawn'))
        const flowerZone4 = this.getFlowerZone4(map.getObjectLayer('flower4_spawn'))
        const coinSpawns = map.getObjectLayer('collectables')


        //Level 3 Environment 
        this.cage = this.add.image(100, 599, 'cage');
        this.cage2 = this.add.image(143, 599, 'cage');
        this.cage3 = this.add.image(683, 599, 'cage');
        this.cage4 = this.add.image(640, 599, 'cage');
        this.smallLight = this.add.image(75, 595, 'smallLamp')
        this.bigLight = this.add.image(175, 587, 'bigLamp')
        this.bigLigh2 = this.add.image(40, 587, 'bigLamp')
        this.bigLigh3 = this.add.image(605, 587, 'bigLamp')
        this.vine = new ClingVine(this, 512, 416)
        const blinkingCoin = new BlinkingCoin(this, 360, 138);
        blinkingCoin.setScrollFactor(0,0)


        //enemies
        this.flower1 = new Flower(this, FlowerZone1.start.x, FlowerZone1.start.y)
        this.flower2 = new Flower(this, flowerZone2.start.x, flowerZone3.start.y)
        this.flower3 = new Flower(this, flowerZone3.start.x, flowerZone3.start.y)
        this.flower4 = new Flower(this, flowerZone4.start.x, flowerZone4.start.y)
        const koopas = this.createKoopa(koopaSpawns)
        const flyingKoopas = this.createFlyingKoopa(flyingKoopaSpawns)
  
        //player
        const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'));
        this.player = new Player(this, playerZones.start.x, playerZones.start.y).setScale(1.2)
        this.physics.add.collider(this.player, platforms)

        this.scoreText = this.add.text(380, 125, 'X ' + this.score, {fontSize: '12px', fill: '#FFF', fontFamily: 'PressStart2P'})
        this.scoreText.setScrollFactor(0,0);

        //Collectables
        const coins = this.createCoins(coinSpawns);

        //camera
        this.setupFollowCamera(this.player);

        //colliders
        this.physics.add.overlap(this.player, this.vine, this.onVineOverlap, null, this);

        this.physics.add.collider(this.flower1, platforms);
        this.physics.add.collider(this.flower2, platforms);
        this.physics.add.collider(this.flower3, platforms);
        this.physics.add.collider(this.flower4, platforms);

        this.physics.add.collider(this.flower1, this.player.projectiles, () => {
            this.flower1.takesHit(this.player.projectiles)
        })
        this.physics.add.collider(this.flower2, this.player.projectiles, () => {
            this.flower2.takesHit(this.player.projectiles)
        })
        this.physics.add.collider(this.flower3, this.player.projectiles, () => {
            this.flower3.takesHit(this.player.projectiles)
        })
        this.physics.add.collider(this.flower4, this.player.projectiles, () => {
            this.flower4.takesHit(this.player.projectiles)
        })

        this.physics.add.collider(this.player, this.flower1, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower2, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower3, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower4, this.onPlayerCollision, null, this)

        
        coins.forEach(coin => {
            this.physics.add.overlap(this.player, coin, () => {
                this.createCoinSound();
                coin.disableBody(true, true)
                this.score++;
                this.scoreText.setText('X ' + this.score);
             
            })
        })

        koopas.forEach((koopa) => {
            this.physics.add.collider(koopa, platforms)
            this.physics.add.collider(this.player, koopa, this.onPlayerCollision, null, this)
            this.physics.add.collider(koopa, this.player.projectiles, () => {
                koopa.redkoopaTakesHit(this.player.projectiles)
            })

        })
       
        flyingKoopas.forEach((flyingKoopa) => {
            this.physics.add.collider(flyingKoopa, platforms)
             this.physics.add.collider(this.player, flyingKoopa, this.onPlayerCollision, null, this)
            this.physics.add.collider(flyingKoopa, this.player.projectiles, () => {
                flyingKoopa.flyingKoopaTakesHit(this.player.projectiles)
            }) 

        }) 


        this.createEndOfLevel(playerZones.end, this.player);
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

    onVineOverlap() {
        console.log('pllayer overlaps with vine')
        this.player.climb();
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

    getFlowerZone3(flowerZoneLayer) {
        const FlowerZone = flowerZoneLayer.objects;
        return {
         start: FlowerZone.find(zone => zone.name === 'flower3_spawn')
        }     
    }
  
    getFlowerZone4(flowerZoneLayer) {
        const FlowerZone = flowerZoneLayer.objects;
        return {
         start: FlowerZone.find(zone => zone.name === 'flower4_spawn')
        }     
    }

    onPlayerCollision() {
        this.player.takesHit()
         hits++;
         this.displayHealth(this.healthX, this.healthY, hits)
 
     }

     
    createCoins(collectablesLayer) {
        return collectablesLayer.objects.map(spawnPoint => {
            return new Coin(this, spawnPoint.x, spawnPoint.y)
        })
    }

    createCoinSound() {
        this.sound.add('coin_pickup', {loop: false, volume: 0.2}).play();
    }

    createKoopa(koopaLayer) {
          return  koopaLayer.objects.map(spawnPoint => {
                    return new Redkoopa(this, spawnPoint.x, spawnPoint.y)
            })
    }
 
    createFlyingKoopa(flyingKoopaLayer) {
          return  flyingKoopaLayer.objects.map(spawnPoint => {
                    return new Flyingkoopa(this, spawnPoint.x, spawnPoint.y)
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

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end').setAlpha(0).setSize(5, 250).setOrigin(0.5, 2)

         const endLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            endLevelOverlap.active = false;
            console.log('end of level')
          
        }) 
    }


    createGameEvents() {
        EventEmitter.on('PLAYER_LOSE', () => {
            this.scene.stop();
            this.scene.start('GameOver')
        })
    }


}

export default Level4