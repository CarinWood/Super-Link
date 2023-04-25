import Phaser from "phaser";
import Play from "./scenes/Play";
import Preload from "./scenes/Preload";

const MAP_WIDTH = 1600;

const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH: 0,
  width: document.body.offsetWidth,
  height: HEIGHT,
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 600,
  //backgroundColor: 0x5c95fc,
  physics: {
    default: 'arcade',
    arcade: {
   
    }
  },
  scene: [new Preload(SHARED_CONFIG), new Play(SHARED_CONFIG)]
};

new Phaser.Game(config);