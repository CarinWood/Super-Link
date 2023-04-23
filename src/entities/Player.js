import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {prefix: 'run', end: 10, zeroPad: 3}),
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player', {prefix: 'idle', end: 3, zeroPad: 3})
        }) 
     
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
      
     this.play('run', true)
       

  
    }

    

}

export default Player;