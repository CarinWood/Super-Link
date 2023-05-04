import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(config) {
            super('Preload')

            this.config = config;
    }

    preload() {
        this.load.tilemapTiledJSON('level_1', './assets/overworld.json')
        this.load.tilemapTiledJSON('level_2', './assets/overworld2.json')
        this.load.tilemapTiledJSON('level_3', './assets/overworld3.json')
        this.load.tilemapTiledJSON('level_4', './assets/overworld4.json')


        this.load.image('tiles-1', './assets/OverWorld.png')
        this.load.image('tiles-2', './assets/Castle.png')
        this.load.image('tiles-3', './assets/level2_tiles.png')
        this.load.image('tiles-4', './assets/misc.png')
        this.load.image('tiles-5', './assets/world-4-tileset.png')


        this.load.image('clingvine', './assets/clingvine.png')
        this.load.atlas('player', './assets/player/pinkmonster.png', './assets/player/pinkmonster.json');
        this.load.atlas('princess', './assets/player/princess_stand_sheet.png', './assets/player/princess_stand_sheet.json');
        this.load.atlas('princessleft', './assets/player/left_princess_sheet.png', './assets/player/left_princess_sheet.json');

        this.load.atlas('pinkidle', './assets/player/pinkidlesheet.png', './assets/player/pinkidlesheet.json');
        this.load.atlas('pinkjump', './assets/player/pinkjump.png', './assets/player/pinkjump.json');
        
        this.load.atlas('flower', './assets/enemies/flower.png', './assets/enemies/flower.json');
        this.load.atlas('gomba', './assets/enemies/gombasheet.png', './assets/enemies/gombasheet.json');
        this.load.atlas('koopa', './assets/enemies/koopasheet.png', './assets/enemies/koopasheet.json');
        this.load.atlas('flyingkoopa', './assets/enemies/flyingkoopa.png', './assets/enemies/flyingkoopa.json');
        this.load.atlas('bowser_walk_sheet', './assets/enemies/bowser_walk_sheet.png', './assets/enemies/bowser_walk_sheet.json');
        this.load.atlas('bowser_jaw_sheet', './assets/enemies/bowser_jaw_sheet.png', './assets/enemies/bowser_jaw_sheet.json');
       
        this.load.atlas('throw', './assets/player/throwsheet.png', './assets/player/throwsheet.json');
        this.load.atlas('spikey', './assets/enemies/spikesheet.png', './assets/enemies/spikesheet.json');
        this.load.atlas('redkoopa', './assets/enemies/redkoopa.png', './assets/enemies/redkoopa.json');
        this.load.atlas('coin', './assets/collectables/coinsheet.png', './assets/collectables/coinsheet.json');
        this.load.image('question', './assets/collectables/questionbox.png');
        this.load.image('solidblock', './assets/collectables/solidblock.png');
        this.load.atlas('blinkingCoin', './assets/collectables/blinkingCoinSheet.png', './assets/collectables/blinkingCoinSheet.json');
        this.load.atlas('climb', './assets/player/climb.png', './assets/player/climb.json');
        this.load.atlas('fire', './assets/weapons/firesheet.png', './assets/weapons/firesheet.json');
        this.load.image('heart', './assets/heart.png')
        this.load.image('emptyHeart', './assets/emptyHeart.png')
        this.load.image('rock', './assets/weapons/Rock1.png')
        this.load.image('jumpingflame', './assets/enemies/jumpingflame.png')
        
        this.load.image('lift', './assets/lift.png')
        this.load.image('cage', './assets/level_3_assets/cage.png')
        this.load.image('smallLamp', './assets/level_3_assets/smallLight.png')
        this.load.image('bigLamp', './assets/level_3_assets/bigLight.png')
   
        this.load.image('bg_night', './assets/backgrounds/background_level_1.png');
        this.load.image('menu_bg', './assets/backgrounds/smallbanner.jpg');
        this.load.image('pink_monster', './assets/Pink_Monster.png');
        this.load.image('button', './assets/mybtn.png');

        this.load.image('headline', './assets/purpleheadline.png');
        this.load.audio('coin_pickup', './assets/audio/coin_pickup.wav')
        this.load.audio('jump_sound', './assets/audio/jump.wav')
        this.load.audio('rockThrow', './assets/audio/popsound.wav')
        this.load.audio('pick_shroom_sound', './assets/audio/pickshroom.wav')
        this.load.audio('game_clear', './assets/audio/levelClear.mp3')
        this.load.image('mariostar', './assets/collectables/mariostar.png')
        this.load.image('greenshroom', './assets/collectables/greenshroom.png')


      

    }

     create() {
        this.scene.start('Menu')
        
     }

}

export default Preload