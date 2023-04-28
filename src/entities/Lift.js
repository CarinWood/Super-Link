import Phaser from "phaser";

class Lift extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lift');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.init();
        this.initEvents();
    }

    init() {
        this.setOrigin(0.5, 1)
        this.setImmovable();
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        if (this.y <= 400) {
            this.setGravityY(50);
        } else if (this.y >= 500) {
            this.setGravityY(-50);
        }
    
        // To ensure that the lift doesn't go beyond 400px and 700px
        this.y = Phaser.Math.Clamp(this.y, 400, 700);
    }

}

export default Lift;