import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(config) {
            super('Preload')
    }

    preload() {
        this.load.tilemapTiledJSON('map', './assets/overworld.json')
        this.load.image('tiles-1', './assets/OverWorld.png')
        this.load.image('tiles-2', './assets/Castle.png')
        this.load.atlas('player', './assets/player/pinkmonster.png', './assets/player/pinkmonster.json');
        this.load.atlas('pinkidle', './assets/player/pinkidlesheet.png', './assets/player/pinkidlesheet.json');
        this.load.atlas('pinkjump', './assets/player/pinkjump.png', './assets/player/pinkjump.json');
        this.load.atlas('flower', './assets/enemies/flower.png', './assets/enemies/flower.json');
        this.load.atlas('gomba', './assets/enemies/gombasheet.png', './assets/enemies/gombasheet.json');
        this.load.atlas('throw', './assets/player/throwsheet.png', './assets/player/throwsheet.json');
        this.load.atlas('spikey', './assets/enemies/spikesheet.png', './assets/enemies/spikesheet.json');
        this.load.atlas('coin', './assets/collectables/coinsheet.png', './assets/collectables/coinsheet.json');
        this.load.atlas('blinkingCoin', './assets/collectables/blinkingCoinSheet.png', './assets/collectables/blinkingCoinSheet.json');
        this.load.image('heart', './assets/heart.png')
        this.load.image('emptyHeart', './assets/emptyHeart.png')
        this.load.image('rock', './assets/weapons/Rock1.png')
        this.load.spritesheet('hit-sheet', './assets/weapons/hit_effect_sheet.png', {
            frameWidth: 32, frameHeight: 32,
        });

    }

    create() {
        this.scene.start('Play')

    }

}

export default Preload