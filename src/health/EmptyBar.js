import Phaser from "phaser";

class EmptyBar extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'emptyHeart');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();

        
    }

    init() {
      this.setScale(0.025)
      this.setScrollFactor(0,0);  
       
   
     
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
 
   
    }



    

}

export default EmptyBar;