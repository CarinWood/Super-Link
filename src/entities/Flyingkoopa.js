import Phaser from "phaser";

class Flyingkoopa extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'flyingkoopa');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.starty= y;
  

        this.init();
        this.initEvents();
    

        
    }

    init() {
        this.lowest = this.starty - 50
        this.highest = this.starty + 130
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setImmovable(true);
        this.isDamaged = false

   
       

        this.scene.anims.create({
            key: 'koopafly',
            frames: this.scene.anims.generateFrameNames('flyingkoopa', {prefix: 'fly', end: 2, zeroPad: 3}),
            frameRate: 3,
            repeat: -1,
        })


    }

    playDamageTweenFlyingKoopa() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

   
    flyingKoopaTakesHit(source) {
        this.isDamaged = true;
        source.setActive(false)
        source.setVisible(false)
        this.playDamageTweenFlyingKoopa();
        this.setVelocity(0, -100)
        this.body.checkCollision.none = true;
        this.setCollideWorldBounds(false);
    }
    

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        this.play('koopafly', true)


            if(this.isDamaged === true) {
           
                return
            } else {
                if(this.y >=this.highest) {
                    this.setVelocityY(-200)
                }
            }
           


           if(this.x < 500) {
            this.flipX = true;
           }
    }

    

}

export default Flyingkoopa;