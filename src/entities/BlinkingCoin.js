import Phaser from "phaser";

class BlinkingCoin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'blinkingCoin');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
    
        this.setOrigin(0.5, 1)


        this.scene.anims.create({
            key: 'blink',
            frames: this.scene.anims.generateFrameNames('blinkingCoin', {prefix: 'blink', end: 4, zeroPad: 3}),
            frameRate: 7,
            repeat: -1,
        })
       
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
     
        this.play('blink', true)

      
    
   
    }



    

}

export default BlinkingCoin;