import Phaser from "phaser";

class End extends Phaser.Scene {
    constructor(config) {
        super('end')

        this.config = config;

    }

    create() {
        const gameOverText = this.add.text(600, 300, 'The End', 
        {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();

    }

    update() {

    }
}

export default End;