class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        //load general assets
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('bg2', 'assets/images/bg2.png');
        this.load.image('npc', 'assets/images/npc.png');
        this.load.image('bgtools', 'assets/images/bgitems.png');
        //healthy plant assets
        this.load.image('p1a', 'assets/images/1a.png');
        this.load.image('p2a', 'assets/images/2a.png');
        this.load.image('p3a', 'assets/images/3a.png');
        this.load.image('p4a', 'assets/images/4a.png');
        this.load.image('p5a', 'assets/images/5a.png');
        this.load.image('p6a', 'assets/images/6a.png');
        this.load.image('p7a', 'assets/images/7a.png');
        this.load.image('p8a', 'assets/images/8a.png');
        this.load.image('p9a', 'assets/images/9a.png');
        this.load.image('p10a', 'assets/images/10a.png');
        this.load.image('p11a', 'assets/images/11a.png');
        this.load.image('p12a', 'assets/images/12a.png');
        this.load.image('p13a', 'assets/images/13a.png');
        this.load.image('p14a', 'assets/images/14a.png');
        this.load.image('p15a', 'assets/images/15a.png');
        this.load.image('p16a', 'assets/images/16a.png');
        //unhealthy plant assets
        this.load.image('p1b', 'assets/images/1b.png');
        this.load.image('p2b', 'assets/images/2b.png');
        this.load.image('p3b', 'assets/images/3b.png');
        this.load.image('p4b', 'assets/images/4b.png');
        this.load.image('p5b', 'assets/images/5b.png');
        this.load.image('p6b', 'assets/images/6b.png');
        this.load.image('p7b', 'assets/images/7b.png');
        this.load.image('p8b', 'assets/images/8b.png');
        this.load.image('p9b', 'assets/images/9b.png');
        this.load.image('p10b', 'assets/images/10b.png');
        this.load.image('p11b', 'assets/images/11b.png');
        this.load.image('p12b', 'assets/images/12b.png');
        this.load.image('p13b', 'assets/images/13b.png');
        this.load.image('p14b', 'assets/images/14b.png');
        this.load.image('p15b', 'assets/images/15b.png');
        this.load.image('p16b', 'assets/images/16b.png');
        //customer assets
        this.load.image('npc1', 'assets/images/bis.png');
        this.load.image('npc2', 'assets/images/cirrus.png');
        this.load.image('npc3', 'assets/images/ennea.png');
        this.load.image('npc4', 'assets/images/luce.png');
        this.load.image('npc5', 'assets/images/mel.png');
        this.load.image('npc6', 'assets/images/mia.png');
        this.load.image('npc7', 'assets/images/sei.png');
        this.load.image('npc8', 'assets/images/witch.png');
        //tool assets
        this.load.image('fertilizer', 'assets/images/fertilizer.png');
        this.load.image('insecticide', 'assets/images/insecticide.png');
        this.load.image('scissors', 'assets/images/scissors.png');
        this.load.image('shovel', ' assets/images/shovel.png');
        this.load.image('soil', 'assets/images/soil.png');
        this.load.image('water', 'assets/images/water.png');

        //load sounds
        this.load.audio('bgm', 'assets/sounds/bgm.wav');
        this.load.audio('bell', 'assets/sounds/bell.wav');
        

        //start intro when everything has loaded
        this.load.on('complete', () => {
            this.scene.start(`play`);
        })
    }

    create() {
                //adding background music
                this.bgm = this.sound.add('bgm');

                this.bgm.play({
                    loop: true
                });

    }

    update() {

    }
}