import Phaser from "phaser";

class Star extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'mariostar');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.setScale(1)
        this.setOrigin(0.5, 1)
        this.starIsShowing = false
        this.setCollideWorldBounds(true);
   
    
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    
    playBlinkingStar() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            repeat: 18,
            tint: 0xffffff
        })
    }


    reveal() {
      
        if(this.starIsShowing === false) {
       
        this.setVelocityY(-20)
        this.playBlinkingStar();
        setTimeout(() => {
            this.setVelocityY(0)
        }, 1000)

    } else {
        return
    }

        this.starIsShowing = true
    
    
        
    }



    update(time, delta) {

           
    
    }   

}

export default Star;