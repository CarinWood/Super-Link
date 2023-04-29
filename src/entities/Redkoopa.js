import Phaser from "phaser";

class Redkoopa extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'redkoopa');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.startx = x;

        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(0.3)
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setImmovable(true);
        this.setOffset(0, -1)

       

      
        this.scene.anims.create({
            key: 'redkoopawalk',
            frames: this.scene.anims.generateFrameNames('redkoopa', {prefix: 'redkoopawalk', end: 2, zeroPad: 3}),
            frameRate: 3,
            repeat: -1,
        })


    }

    playDamageTweenRedKoopa() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

   
    redkoopaTakesHit(source) {
        source.setActive(false)
        source.setVisible(false)
        this.playDamageTweenRedKoopa();
        this.setVelocity(0, -100)
        this.body.checkCollision.none = true;
        this.setCollideWorldBounds(false);
    }
    

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        this.play('redkoopawalk', true)

            this.setVelocityX(-35)
            this.flipX = true;
    }



    

}

export default Redkoopa;