import Phaser from "phaser";

class Mushroom extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'greenshroom');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.shroomIsShowing = false;
    
      


       
       
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
     
      

      
    
   
    }

    showShroom() {
        if(this.shroomIsShowing === false) {
       
            this.setVelocityY(-20)
        
            setTimeout(() => {
                this.setVelocityY(0)
                this.setGravityY(300)
                this.setVelocityX(100)
                this.setDepth(10)
            }, 900)
        
        } else {
            return
        }
    
            this.shroomIsShowing = true
    
       
    }




    

}

export default Mushroom;