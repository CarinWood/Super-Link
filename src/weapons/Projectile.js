import Phaser from "phaser"
import SpriteEffect from "../effects/SpriteEffect";

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
    super(scene, x, y, key)

    scene.add.existing(this);
    scene.physics.add.existing(this)

    this.speed = 300;
    this.maxDistance = 300;
    this.traveledDistance = 0;
    this.damage = 10;

    this.cooldown = 100;

    }

 

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        this.traveledDistance += this.body.deltaAbsX();


        if(this.traveledDistance >= this.maxDistance) {
            this.body.reset(0, 0);
           
            this.traveledDistance = 0;
        }
}

    fire(x, y) {
        this.setActive(true)
        this.setVisible(true)
        this.body.reset(x, y);

        this.setVelocityX(this.speed);
    
    }

}

export default Projectile