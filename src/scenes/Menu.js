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

        this.headline = this.add.image(650, 150, 'headline')

         const playText = this.add.text(660, 330, 'Play', 
         {fontSize: '32px', fill: '#8a4dcf', fontFamily: "mario"})
         .setOrigin(0.5, 1)
         .setInteractive();

         playText.on('pointerover', () => {
            playText.setStyle({fill: '#6b33a9'})
        })

        playText.on('pointerout', () => {
            playText.setStyle({fill: '#8a4dcf'})
        })

        playText.on('pointerdown', () => {
     
            this.scene.start('Play');
    })
    }

}

export default Menu;