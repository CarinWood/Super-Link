import Phaser from "phaser";

class Questionbox extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'question');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.holdCoins = 5;
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.setImmovable();


       
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }


    releaseCoin() {
        this.holdCoins--;
        if(this.holdCoins <= 0) {
            this.setActive(false)
            this.setVisible(false)
        }
        console.log(this.holdCoins);
    }

 


    

}

export default Questionbox;