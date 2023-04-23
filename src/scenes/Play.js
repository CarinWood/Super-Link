import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor() {
        super('Play')
    }

    preload() {
     
        
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
 
        this.player = new Player(this, 100, 200);
  
        

    }

    update() {
  
    }
}

export default Play;