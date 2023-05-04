import Phaser from "phaser";
import Projectile from "../weapons/Projectile";
import Projectiles from "../weapons/Projectiles";
import EventEmitter from "../events/EventEmitter";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.setGravityY(500);
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.hasBeenHit = false;
        this.cantTakeHit = 0;
        this.playerHits = 0;
        this.projectiles = new Projectiles(this.scene)
        this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        this.keyboard = this.scene.input.keyboard;
        this.qKey = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.wKey = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.playerHealth = 30;
        this.canClimb = false;
        this.gameFinished = false;
        

      
        

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: 'walk', end: 6, zeroPad: 3}),
            frameRate: 14,
            repeat: -1,
        })

         this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('pinkidle', {prefix: 'idle', end: 4, zeroPad: 3}),
            frameRate: 4,
            repeat: -1,
        }) 
   
         this.scene.anims.create({
            key: 'playerclimb',
            frames: this.scene.anims.generateFrameNames('climb', {prefix: 'climb', end: 4, zeroPad: 3}),
            frameRate: 9,
            repeat: -1,
        }) 
   
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('pinkjump', {prefix: 'jump', end: 8, zeroPad: 3}),
            frameRate: 1,
            repeat: -1,
        }) 
      
        this.scene.anims.create({
            key: 'throw',
            frames: this.scene.anims.generateFrameNames('throw', {prefix: 'throw', end: 4, zeroPad: 3}),
            frameRate: 30,
            repeat: 0,
        }) 
        
   
        

        this.scene.input.keyboard.on('keydown-Q', () => {
            this.projectiles.fireProjectile(this);
        })
   
     
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    setGameFinished() {
        this.gameFinished = true;
        this.anims.stop('walk');
    }

    update() {

        if(this.gameFinished === true) {
            return
        }
      
        const onFloor = this.body.onFloor();
   
         if(this.hasBeenHit || !this.body) {
            return
        }

     
         if(this.y > 700) {
            
            EventEmitter.emit('PLAYER_LOSE')
        }
 
        const {left, right, space, up, Q, W} = this.cursors;
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

        if (this.wKey.isDown) {
           
            this.play('playerclimb', true)
       
        } else if(left.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
            this.setVelocityX(-150)
            this.play('walk', true)
            this.flipX = true;
        } else if (right.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
            this.flipX = false;
            this.setVelocityX(150);
            this.play('walk', true)
        } else if (this.qKey.isDown) {
            if(!this.play('throw', true).isPlaying) {
                    this.play('throw', true)
            }
            this.play('throw', true)
       
        }
        else {
            this.setVelocityX(0)
            this.play('idle', true)
        }


        if(isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.play('jump', true)
            this.setVelocityY(-300);
            this.jumpCount += 1;
        }

        if(onFloor) {
            this.jumpCount = 0;
        } 

      
        if(this.anims.isPlaying && this.anims.getCurrentKey() === 'throw') {
            return
        }  

        if(this.anims.isPlaying && this.anims.getCurrentKey() === 'playerclimb') {
            return
        }

        onFloor ? this.body.velocity.x != 0 ?
        this.play("walk", true) : this.play('idle', true) : this.play('jump', true)
    }





    getPlayerHits() {
        return this.playerHits
    }

    cantTakeHitFunc() {
        this.cantTakeHit++;
    }
    resetCantTakeHit() {
        this.cantTakeHit = 0;
    }

    playDamageTween() {
         this.scene.tweens.add({
             targets: this,
             duration: 100,
             repeat: 8,
             tint: 0xffffff
         })
     }

    bounceOff() {
        this.body.touching.right ?
        this.setVelocityX(-200) : 
        this.setVelocityX(200);
        this.playDamageTween(); 
        setTimeout(() => {
         this.setVelocityY(-200);
        }, 0)
    }

    takesHit() {
        
        if(this.cantTakeHit) {
            return
        }
        if(this.hasBeenHit) {
            return;
        }

        this.playerHealth-=10;

        if(this.playerHealth <= 0) {
            EventEmitter.emit('PLAYER_LOSE')
            return
        }

        this.hasBeenHit = true;
        this.playerHits++;
        this.bounceOff(); 
       
        
        this.scene.time.addEvent({
            delay: 900,
            callback: () => {
                this.hasBeenHit = false;
            },
            loop: false,
        })
    }


    climb() {
        console.log('player climbes')
        if(this.wKey.isDown) {
            this.setVelocityY(-100);
        } 
      
    }

  

    

}

export default Player;