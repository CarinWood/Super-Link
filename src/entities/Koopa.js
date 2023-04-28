import Phaser from "phaser";

class Koopa extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'koopa');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.1)
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setImmovable(true);
        this.setOffset(0, -2)

       

        this.scene.anims.create({
            key: 'koopawalk',
            frames: this.scene.anims.generateFrameNames('koopa', {prefix: 'koopawalk', end: 2, zeroPad: 3}),
            frameRate: 3,
            repeat: -1,
        })


    }

    playDamageTweenKoopa() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

   
    koopaTakesHit(source) {
        source.setActive(false)
        source.setVisible(false)
        this.playDamageTweenKoopa();
        this.setVelocity(0, -100)
        this.body.checkCollision.none = true;
        this.setCollideWorldBounds(false);
    }
    

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        this.play('koopawalk', true)
   
    }



    

}

export default Koopa;