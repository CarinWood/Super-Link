import Phaser from "phaser";

class Coin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'coin');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();

        
    }

    init() {
        this.setScale(1.2)
        this.setOrigin(0.5, 1)
        this.coinTimes = 5;


        this.scene.anims.create({
            key: 'cointurn',
            frames: this.scene.anims.generateFrameNames('coin', {prefix: 'coin', end: 4, zeroPad: 3}),
            frameRate: 4,
            repeat: -1,
        })
       
     
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
     
        this.play('cointurn', true)

      
    
   
    }

    jumpCoin() {
        this.coinTimes--;
        if(this.coinTimes < 0) {
            this.setVisible(false);
         
          
        }
        this.y -= 40;
        setTimeout(() => {
            this.y += 40
        }, 120)
    }




    

}

export default Coin;