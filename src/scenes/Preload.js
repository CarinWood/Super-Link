import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(config) {
            super('Preload')
    }

    preload() {
        this.load.image('sky', './assets/sky.png')
        this.load.atlas('player', './assets/player/link.png', './assets/player/link.json');

    }

    create() {
        this.scene.start('Play')

    }

}

export default Preload