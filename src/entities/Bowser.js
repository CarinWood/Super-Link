import Phaser from "phaser";


class Bowser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'bowser_walk_sheet');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setGravityY(100);
        this.setOffset(0, -1);
        this.health = 100;

        this.setImmovable(true);
   
        this.scene.anims.create({
            key: 'bowser_walk',
            frames: this.scene.anims.generateFrameNames('bowser_walk_sheet', {prefix: 'bowserwalk', end: 2, zeroPad: 3}),
            frameRate: 3,
            repeat: -1,
        })
        
    
     
    }

    decreaseHealth() {
        this.health -= 10
        console.log('bowsers current health: ' + this.health)
    }

    playDamageTweenBowser() {
        this.scene.tweens.add({
            targets: this,
            duration: 50,
            repeat: 8,
            tint: 0xffffff
        })
    }

    takesHit(source) {
        source.setActive(false)
        source.setVisible(false)
            this.decreaseHealth();
            this.playDamageTweenBowser();
        

         /*    this.setVelocity(0, -100)
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false); */
       

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    bowserJump() {
        this.setVelocityY(-80);
    }

    update(time, delta) {
       this.play('bowser_walk', true)

    



   
    }



    

}

export default Bowser;