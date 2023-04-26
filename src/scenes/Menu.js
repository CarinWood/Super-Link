import Phaser from "phaser";


class Menu extends Phaser.Scene {
    constructor(config) {
        super('Menu')

        
    this.config = config;

    this.screenCenter = [config.width / 2, config.height /2];
    
    this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: null, text: 'Exti'}
        ]

    }

    preload() {
        this.load.image('bg_night', './assets/backgrounds/pixelsky.png');
    }


    create() {
       this.background = this.add.tileSprite(0, 400, this.config.width, 250, "bg_night")
         .setOrigin(0, 0)

         const playText = this.add.text(this.config.width/2-160, 300, 'Play', 
         {fontSize: '32px', fill: '#FFF'})
         .setOrigin(0.5, 1)
         .setInteractive();

         playText.on('pointerover', () => {
            playText.setStyle({fill: '#ff0'})
        })

        playText.on('pointerout', () => {
            playText.setStyle({fill: '#FFF'})
        })

        playText.on('pointerdown', () => {
     
            this.scene.start('Play');
    })
    }

}

export default Menu;