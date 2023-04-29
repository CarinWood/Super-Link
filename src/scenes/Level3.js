import Phaser from "phaser";
import Player from "../entities/Player";
import ClingVine from "../entities/Clingvine";
import Flower from "../entities/Flower";
import Projectiles from "../weapons/Projectiles";

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

        //zones
        const FlowerZone1 = this.getFlowerZone1(map.getObjectLayer('enemy_spawns'));

        //Level 3 Environment 
        this.cage = this.add.image(100, 599, 'cage');
        this.cage2 = this.add.image(143, 599, 'cage');
        this.cage3 = this.add.image(683, 599, 'cage');
        this.cage4 = this.add.image(640, 599, 'cage');
        this.smallLight = this.add.image(75, 595, 'smallLamp')
        this.bigLight = this.add.image(175, 587, 'bigLamp')
        this.bigLigh2 = this.add.image(40, 587, 'bigLamp')
        this.bigLigh3 = this.add.image(605, 587, 'bigLamp')
        this.vine = new ClingVine(this, 512, 416)

        //enemies
        this.flower1 = new Flower(this, FlowerZone1.start.x, FlowerZone1.start.y) ;


        //player
        const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'));
        this.player = new Player(this, playerZones.start.x, playerZones.start.y).setScale(1.2)
        this.physics.add.collider(this.player, platforms)

        //camera
        this.setupFollowCamera(this.player);

        //colliders
        this.physics.add.overlap(this.player, this.vine, this.onVineOverlap, null, this);
        this.physics.add.collider(this.flower1, platforms);
        this.physics.add.collider(this.flower1, this.player.projectiles, () => {
            this.flower1.takesHit(this.player.projectiles)
        })
        this.physics.add.collider(this.player, this.flower1, this.onPlayerCollision, null, this)
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

    onVineOverlap() {
        console.log('pllayer overlaps with vine')
        this.player.climb();
    }

    getFlowerZone1(flowerZoneLayer) {
        const FlowerZone = flowerZoneLayer.objects;
        return {
         start: FlowerZone.find(zone => zone.name === 'Spawn')
        }     
    }

    onPlayerCollision() {
        this.player.takesHit()
        // hits++;
        // this.displayHealth(this.healthX, this.healthY, hits)
 
     }


}

export default Level3