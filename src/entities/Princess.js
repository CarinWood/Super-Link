import Phaser from "phaser";

class Princess extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'princess');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();
    }

    init() {
        this.setScale(1.05)
        this.setOrigin(0.5, 1)
        this.setImmovable();
        this.facingLeft = false;


        
        this.scene.anims.create({
            key: 'princess_stand',
            frames: this.scene.anims.generateFrameNames('princess', {prefix: 'stand', end: 1, zeroPad: 3}),
            frameRate: 30,
            repeat: -1,
        }) 
       
        this.scene.anims.create({
            key: 'princess_left',
            frames: this.scene.anims.generateFrameNames('princessleft', {prefix: 'leftprincess', end: 1, zeroPad: 3}),
            frameRate: 30,
            repeat: -1,
        }) 
    }
    princessCollision() {
        console.log('collides w princess')
        this.facingLeft = true;
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {

            if(this.facingLeft === true) {
                this.play('princess_left', true)
            }
    
      
      
   

    }

  

}

export default Princess;