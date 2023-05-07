import Phaser from "phaser";

class GameOver extends Phaser.Scene {
    constructor(config) {
        super('GameOver')

        this.config = config;

    }

    create() {
        const gameOverText = this.add.text(600, 300, 'Game Over', 
        {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();

    }

    update() {

    }
}

export default GameOver;