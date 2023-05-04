import Phaser from "phaser";
import Play from "./scenes/Play";
import Preload from "./scenes/Preload";
import Menu from "./scenes/Menu";
import GameOver from "./scenes/GameOver";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
import Level4 from "./scenes/Level4";
import End from "./scenes/End";

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
  backgroundColor: 0x1e1753,
  physics: {
    default: 'arcade',
    arcade: {
   
    }
  },
  scene: [new Preload(SHARED_CONFIG), new Menu(SHARED_CONFIG),  new Play(SHARED_CONFIG), new Level2(SHARED_CONFIG), new GameOver(SHARED_CONFIG), new Level3(SHARED_CONFIG), new Level4(SHARED_CONFIG), new End(SHARED_CONFIG)]
};

new Phaser.Game(config);