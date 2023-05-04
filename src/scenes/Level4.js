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
import Bowser from "../entities/Bowser";
import Fire from "../weapons/Fire";
import Princess from "../entities/Princess";
import JumpingFlame from "../entities/JumpingFlame";

let fires;
let bowser
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
        const tileset5 = map.addTilesetImage('world-4-tileset', 'tiles-5')


        const environment = map.createStaticLayer('environment', [tileset1, tileset2]);
        const platforms = map.createStaticLayer('platforms', [tileset1, tileset3, tileset4, tileset5]);
        platforms.setCollisionByExclusion(-1, true)
        const koopaSpawns = map.getObjectLayer('koopa_spawns')
        const flyingKoopaSpawns = map.getObjectLayer('flying_koopa_spawns')
    

        //zones
        const FlowerZone1 = this.getFlowerZone1(map.getObjectLayer('enemy_spawns'));
        const flowerZone2 = this.getFlowerZone2(map.getObjectLayer('flower2_spawn'))
        const flowerZone3 = this.getFlowerZone3(map.getObjectLayer('flower3_spawn'))
        const flowerZone4 = this.getFlowerZone4(map.getObjectLayer('flower4_spawn'))
        
        const coinSpawns = map.getObjectLayer('collectables')


        //Level 4 Environment 
        this.vine = new ClingVine(this, 497, 380).setDepth(-1)
        const blinkingCoin = new BlinkingCoin(this, 360, 138);
        blinkingCoin.setScrollFactor(0,0)
        this.jumpingflame = new JumpingFlame(this, 178, 500);   

     


        //enemies
        this.flower1 = new Flower(this, FlowerZone1.start.x, FlowerZone1.start.y)
        this.flower2 = new Flower(this, flowerZone2.start.x, flowerZone3.start.y)
        this.flower3 = new Flower(this, flowerZone3.start.x, flowerZone3.start.y)
        this.flower4 = new Flower(this, flowerZone4.start.x, flowerZone4.start.y)
        const koopas = this.createKoopa(koopaSpawns)
        const flyingKoopas = this.createFlyingKoopa(flyingKoopaSpawns)
        bowser = new Bowser(this, 1500, 600)
  
        //player
        const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'));
        this.player = new Player(this, playerZones.start.x, playerZones.start.y).setScale(1.2)
        this.physics.add.collider(this.player, platforms)
        this.princess = new Princess(this, 1580, 608)

        this.scoreText = this.add.text(380, 125, 'X ' + this.score, {fontSize: '12px', fill: '#FFF', fontFamily: 'PressStart2P'})
        this.scoreText.setScrollFactor(0,0);

        //group of fire:
        fires = this.physics.add.group()
        this.physics.add.collider(fires, this.player, this.onPlayerCollision, null, this)

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
        this.physics.add.collider(bowser, platforms);

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
    
        this.physics.add.collider(bowser, this.player.projectiles, () => {
            bowser.takesHit(this.player.projectiles)
            bowser.decreaseHealth();
        })

  
        this.physics.add.collider(this.player, this.flower1, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower2, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower3, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, this.flower4, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.player, bowser, this.onPlayerCollision, null, this)
        this.physics.add.collider(this.jumpingflame, this.player, this.onPlayerCollision, null, this)
        this.princessCollider = this.physics.add.collider(this.player, this.princess, () => {
            this.princessCollider.destroy()
            this.player.setGameFinished();
            
            this.princess.princessCollision()
            this.createGameClearSound()
            setTimeout(() => {
                    this.scene.stop();
                    this.scene.start('end')
            }, 2500)
        })

        
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

        
        this.anims.create({
            key: 'fire_anim',
            frames: this.anims.generateFrameNames('fire', {prefix: 'fire', end: 2, zeroPad: 3}),
            frameRate: 20,
            repeat: -1,
        })



    }

    update() {

            if(bowser.x === 1400 && bowser.y < 609.2) {
            this.genBowserFire();
         
              //  this.fire = new Fire(this, this.bowser.x-25, this.bowser.y-24)
             
              
               
            }
 
             if(bowser.x === 1500) {
                bowser.bowserJump()
                this.genBowserFire()
              //  this.fire = new Fire(this, this.bowser.x-25, this.bowser.y-24)
              
            } 
    }



    genBowserFire() {
           let fire = fires.create(bowser.x-25, bowser.y-24, 'fire')
           fire.setVelocityX(-100)
           fire.setImmovable(true);
           fire.anims.play('fire_anim', true)
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
 
    createGameClearSound() {
        this.sound.add('game_clear', {loop: false, volume: 0.3}).play();
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