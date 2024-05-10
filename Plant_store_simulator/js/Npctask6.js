class Npctask6 extends Phaser.Scene {
    constructor() {
        super({
            key: 'npctask6'
        });
    }

    create() {

        this.width = 1920;
        this.height = 1080;
        this.bg = this.add.image(this.width/2, this.height/2, 'bg2');
        //add sprites for draggable tools
        //all the code that is commented out that is related to the tools is bcz I wanted to add plant tasks like watering and fertilizing but ran out of time to add those
        //i still want to keep them here in case i ever come back to this project
        this.add.image(this.width/2, 875, 'bgtools');
        this.fertilizer = this.add.image(300, 900, 'fertilizer');
        this.insecticide = this.add.image(950, 850, 'insecticide');
        this.scissors = this.add.image(1150, 950, 'scissors');
        this.shovel = this.add.image(1400, 935, 'shovel');
        this.soil = this.add.image(1700, 850, 'soil');
        this.water = this.add.image(700, 925, 'water');

        //add sprites for selectable plants
        this.plant8 = this.add.image(this.width/2, 350, 'p8a');

        //makes plant sprites interactible
        this.plant8.setInteractive();

        this.input.setDraggable(this.plant8);

        // this.fertilizer.setInteractive();
        // this.insecticide.setInteractive();
        // this.scissors.setInteractive();
        // this.shovel.setInteractive();
        // this.soil.setInteractive();
        // this.water.setInteractive();

        //makes sprite draggable
        // this.input.setDraggable(this.fertilizer);
        // this.input.setDraggable(this.insecticide);
        // this.input.setDraggable(this.scissors);
        // this.input.setDraggable(this.shovel);
        // this.input.setDraggable(this.soil);
        // this.input.setDraggable(this.water);

        const dialogue = "Drag your plant of choice over the counter to hand it to the customer.";

        //setting for dialogue box visuals
        const dialogueBox = this.add.graphics();
        dialogueBox.fillStyle(0xffffff, 0.8);
        dialogueBox.fillRoundedRect(700, 950, 600, 100, 20);
        dialogueBox.setDepth(1); //makes it go over all other elements
        
        //create text to display dialogue
        const dialogueText = this.add.text(720, 970, '', { fontFamily: 'Arial', fontSize: 20, color: '#FFFFFFF', wordWrap: { width: 560 }, align: 'center', padding: { x: 10 } });
        dialogueText.setDepth(2); //makes it go over dialogue box
        
        //display the dialogue at the current index
        dialogueText.setText(dialogue);

        const completeButton = "Task complete!";

        //setting for button visuals
        this.buttonBox = this.add.graphics();
        this.buttonBox.fillStyle(0xffffff);
        this.buttonBox.fillRoundedRect(this.width/2-75, this.height/2+40, 175, 50, 15);
        this.buttonBox.setDepth(1);
        this.buttonBox.setInteractive();

        this.buttonText = this.add.text(this.width/2-65, this.height/2+55, '', { fontFamily: 'Arial', fontSize : 20, color: '#000000', wordWrap: { width: 560 }, align: 'center', padding: { x:10 } });
        this.buttonText.setDepth(2);

        this.buttonText.setText(completeButton);

        this.buttonBox.visible = false;
        this.buttonText.visible = false;
    }

    update() {

        this.input.on('drag', function (pointer, obj, dragX, dragY) {
            obj.x = dragX;
            obj.y = dragY;
         });

         //if plant 2, 10 or 14 is dragged over the counter (to hand over to customer) the task is deemed complete
         if (this.plant8.y < 200) {
            //text for task complete appears
            this.buttonBox.visible = true;
            this.buttonText.visible = true;
            //after 1.5 seconds it switches back to main scene
            this.time.delayedCall(1500, function() {
                this.scene.switch('play');
            }, [], this);
         }
    }

    handleInput() {

    }
}