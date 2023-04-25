import Phaser from "phaser";
import Projectile from "./Projectile";
import { getTimeStamp } from "../utils/Functions";

class Projectiles extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            frameQuantity: 1000,
            active: false,
            visible: false,
            key: 'rock',
            classType: Projectile
        })

        this.timeFromLastProjectile = null;
    }



    fireProjectile(initiator) {
        const projectile = this.getFirstDead(false)
        const center = initiator.getCenter();
        let centerX = 0;

        if(!projectile) {
            return
        }

        if( this.timeFromLastProjectile && this.timeFromLastProjectile + projectile.cooldown > getTimeStamp()) {
            return
        }

        if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
                projectile.speed = Math.abs(projectile.speed)
                centerX = center.x + 10;
             
        } else if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_LEFT) {
                projectile.speed = -Math.abs(projectile.speed)
                centerX = center.x - 10;
                
        }

        projectile.fire(centerX, center.y)
        this.timeFromLastProjectile = getTimeStamp();
    }

}



export default Projectiles