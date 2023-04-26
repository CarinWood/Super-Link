import Phaser from "phaser";

class Flower extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'flower');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();

        
    }

    init() {
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setImmovable(true);



        this.scene.anims.create({
            key: 'eat',
            frames: this.scene.anims.generateFrameNames('flower', {prefix: 'flower', end: 2, zeroPad: 3}),
            frameRate: 8,
            repeat: -1,
        })
      

        
       
   
     
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    playDamageTweenFlower() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

    takesHit(source) {
        this.playDamageTweenFlower();
 
        source.setActive(false)
        source.setVisible(false)
       
        this.setVelocity(0, -150)
        this.body.checkCollision.none = true;
        this.setCollideWorldBounds(false);
    
    }

    update(time, delta) {
        if(!this.active) {return}
        this.play('eat', true)
   
   
    }



    

}

export default Flower;