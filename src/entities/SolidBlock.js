import Phaser from "phaser";

class SolidBlock extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'solidblock');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.hits = 5;
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setImmovable();


       
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }


    hitBlock() {
        this.hits--;
          
        if(this.hits < 0) {
           return
           
        }

       this.y -= 5.5;
       setTimeout(() => {
        this.y += 5.5;
       }, 120)
     
     
       
    }


  

 


    

}

export default SolidBlock;