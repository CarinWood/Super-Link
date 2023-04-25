import Phaser from "phaser";

class Gomba extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'gomba');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setGravityY(300);
        this.setVelocityX(35);
        this.setBounce(1);
        this.setImmovable(true);
        this.gombaDead = 0;
        this.health = 10;

        this.scene.anims.create({
            key: 'gombawalk',
            frames: this.scene.anims.generateFrameNames('gomba', {prefix: 'gombawalk', end: 2, zeroPad: 3}),
            frameRate: 4,
            repeat: -1,
        })
       
        this.scene.anims.create({
            key: 'gombadead',
            frames: this.scene.anims.generateFrameNames('gomba', {prefix: 'gombadead', end: 1, zeroPad: 3}),
            frameRate: 4,
            repeat: -1,
        })
        
       
   
     
    }

    playDeadAnim() {       
        this.gombaDead++;
        this.setVelocityX(0);
        this.setBounce(0);
        this.setOrigin(0.5, 3)
        this.play('gombadead', true)
    }

    playDamageTweenGomba() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

    takesHit(source) {
            this.playDamageTweenGomba();
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
        if(this.gombaDead > 0) {
            return
        } else {
        this.play('gombawalk', true)
        }
   
    }



    

}

export default Gomba;