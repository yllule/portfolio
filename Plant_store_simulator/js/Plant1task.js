class Plant1task extends Phaser.Scene {
    constructor() {
        super({
            key: 'plant1task'
        });
    }

    create() {

        this.width = 1920;
        this.height = 1080;
        this.bg = this.add.image(this.width/2, this.height/2, 'bg2');
        this.add.image(this.width/2, 875, 'bgtools');
        this.fertilizer = this.add.image(300, 900, 'fertilizer');
        this.insecticide = this.add.image(950, 850, 'insecticide');
        this.scissors = this.add.image(1150, 950, 'scissors');
        this.shovel = this.add.image(1400, 935, 'shovel');
        this.soil = this.add.image(1700, 850, 'soil');
        this.water = this.add.image(700, 925, 'water');

        this.fertilizer.setInteractive();
        this.insecticide.setInteractive();
        this.scissors.setInteractive();
        this.shovel.setInteractive();
        this.soil.setInteractive();
        this.water.setInteractive();

        //makes sprite draggable
        this.input.setDraggable(this.fertilizer);
        this.input.setDraggable(this.insecticide);
        this.input.setDraggable(this.scissors);
        this.input.setDraggable(this.shovel);
        this.input.setDraggable(this.soil);
        this.input.setDraggable(this.water);

    }

    update() {

        this.input.on('drag', function (pointer, obj, dragX, dragY) {
            obj.x = dragX;
            obj.y = dragY;
         });

        //if img is dragged over half of the canvas, task is considered 'complete' and the button to move to main scene appears
        if (this.fertilizer.x > 950) {
            this.button = this.add.image(800, 800, 'test');
            this.button.setInteractive();
            this.button.on('pointerdown', () => this.scene.switch('play'))

        }
        
        
    }

    handleInput() {

    }
}