//the title screen of the game

class Title {
    constructor() {

        //variable for title text
        this.titleString = 'On your way home you find an off brand Tamagotcha toy...'

    }

    draw() {

        //text display
        push();
        fill(0, 0, 255);
        textSize(55);
        text(this.titleString, width/2, toy.y-400);
        pop();

        //screen starts off closed
        push();
        imageMode(CENTER);
        image(screenOffImg, toy.x, toy.y);
        pop();

        //adding the asset for note on top of screen
        push();
        imageMode(CENTER);
        image(noteImg, toy.x, toy.y);
        pop();
    }


    mousePressed() {
        //you have to press the center button to start the game
        if(mouseInsideCenterButton()) {
        currentState = new Sprout;
        }
    }
}