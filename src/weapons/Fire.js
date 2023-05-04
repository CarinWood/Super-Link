import Phaser from "phaser";


class Fire extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1)
        this.setOrigin(0.5, 1)
        this.setVelocityX(-100)

        this.setImmovable(true);
   
        this.scene.anims.create({
            key: 'fire_anim',
            frames: this.scene.anims.generateFrameNames('fire', {prefix: 'fire', end: 2, zeroPad: 3}),
            frameRate: 20,
            repeat: -1,
        })
        
    
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }



    update(time, delta) {
       this.play('fire_anim', true)

   
    }



    

}

export default Fire;