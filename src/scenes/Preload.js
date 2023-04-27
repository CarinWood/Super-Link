import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(config) {
            super('Preload')

            this.config = config;
    }

    preload() {
        this.load.tilemapTiledJSON('map', './assets/overworld.json')
        this.load.image('tiles-1', './assets/OverWorld.png')
        this.load.image('tiles-2', './assets/Castle.png')
        this.load.image('clingvine', './assets/clingvine.png')
        this.load.atlas('player', './assets/player/pinkmonster.png', './assets/player/pinkmonster.json');
        this.load.atlas('pinkidle', './assets/player/pinkidlesheet.png', './assets/player/pinkidlesheet.json');
        this.load.atlas('pinkjump', './assets/player/pinkjump.png', './assets/player/pinkjump.json');
        this.load.atlas('flower', './assets/enemies/flower.png', './assets/enemies/flower.json');
        this.load.atlas('gomba', './assets/enemies/gombasheet.png', './assets/enemies/gombasheet.json');
        this.load.atlas('throw', './assets/player/throwsheet.png', './assets/player/throwsheet.json');
        this.load.atlas('spikey', './assets/enemies/spikesheet.png', './assets/enemies/spikesheet.json');
        this.load.atlas('coin', './assets/collectables/coinsheet.png', './assets/collectables/coinsheet.json');
        this.load.image('question', './assets/collectables/questionbox.png');
        this.load.atlas('blinkingCoin', './assets/collectables/blinkingCoinSheet.png', './assets/collectables/blinkingCoinSheet.json');
        this.load.atlas('climb', './assets/player/climb.png', './assets/player/climb.json');
        this.load.image('heart', './assets/heart.png')
        this.load.image('emptyHeart', './assets/emptyHeart.png')
        this.load.image('rock', './assets/weapons/Rock1.png')
     
   
        this.load.image('bg_night', './assets/backgrounds/pixelsky.png');
        this.load.image('menu_bg', './assets/backgrounds/smallbanner.jpg');
        this.load.image('pink_monster', './assets/Pink_Monster.png');
        this.load.image('button', './assets/mybtn.png');

        this.load.image('headline', './assets/purpleheadline.png');
        this.load.audio('coin_pickup', './assets/audio/coin_pickup.wav')
        this.load.audio('jump_sound', './assets/audio/jump.wav')
        this.load.audio('rockThrow', './assets/audio/popsound.wav')

    }

    create() {
        this.scene.start('Menu')
        
    }

}

export default Preload