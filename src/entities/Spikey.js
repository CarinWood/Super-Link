import Phaser from "phaser";

class Spikey extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'spikey');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setVelocityX(-35);
        this.setImmovable(true);
        this.gombaDead = 0;

        this.scene.anims.create({
            key: 'spikeywalk',
            frames: this.scene.anims.generateFrameNames('spikey', {prefix: 'spikeywalk', end: 2, zeroPad: 3}),
            frameRate: 4,
            repeat: -1,
        })
       
     
        
       
   
     
    }


    playDamageTweenSpikey() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

    takesHit(source) {
            this.playDamageTweenSpikey();
            source.setActive(false)
            source.setVisible(false)

            this.setVelocity(0, -100)
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
       

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
     
        this.play('spikeywalk', true)

      
    
   
    }



    

}

export default Spikey;