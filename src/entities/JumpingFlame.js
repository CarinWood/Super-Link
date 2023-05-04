import Phaser from "phaser";

class JumpingFlame extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'jumpingflame');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.starty= y;


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.1)
        this.highest = this.starty + 170
        this.setGravityY(300)
        this.setImmovable(true);
   
     
    }

    flipFire() {
        this.flipY(true);
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {

        // // if(this.y <= 500) {
        // //     this.setVelocityY(100)
        // // } else 
       
         if(this.y >= 700) {
             this.setVelocityY(-350);
         
         } 


      
       
       
    }

       

}

export default JumpingFlame;