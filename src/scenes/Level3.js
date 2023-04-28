import Phaser from "phaser";
import Player from "../entities/Player";

class Level3 extends Phaser.Scene {

    constructor(config) {
        super('level3')
        this.config = config;
    }


    create() {
        console.log('this is level 3')

        const map = this.make.tilemap({key: 'level_3'})

        const tileset1 = map.addTilesetImage('OverWorld', 'tiles-1')
        const tileset2 = map.addTilesetImage('Castle', 'tiles-2')
        const tileset3 = map.addTilesetImage('level2_tiles', 'tiles-3')
        const tileset4 = map.addTilesetImage('misc', 'tiles-4')


        const environment = map.createStaticLayer('environment', [tileset1, tileset2]);
        const platforms = map.createStaticLayer('platforms', [tileset1, tileset3, tileset4]);
        platforms.setCollisionByExclusion(-1, true)


        //player
        const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'));
        this.player = new Player(this, playerZones.start.x, playerZones.start.y).setScale(1.2)
        this.physics.add.collider(this.player, platforms)

        //camera
        this.setupFollowCamera(this.player);
    }


    setupFollowCamera(player) {
        const {width, height, mapOffset} = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 100)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 40).setZoom(1.5);
        this.cameras.main.startFollow(player);
    }
    
    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }


}

export default Level3