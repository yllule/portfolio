class Tutorial {
    constructor() {

    }

    draw() {

        outside.stop();
        //adding bg music
        if (!ambiance.isPlaying()) {
            ambiance.setVolume(0.5);
            ambiance.loop();
        }

        //images
        push();
        imageMode(CENTER);
        image(livingRoomImg, width/2, height/2);
        image(handImg, width-50, height/2+100);
        pop();

        //dialogue box
        push();
        noStroke();
        rectMode(CENTER);
        fill(200);
        rect(width/2, height-100, 450, 70, 20, 20, 20, 20);
        pop();

        //text
        push();
        fill(0);
        textSize(11);
        textAlign(CENTER);
        textFont('Georgia');
        text(tutText[currentIndexTut], width/2, height-95);
        pop();
    }

    mousePressed() {
        //makes the text change
        currentIndexTut = currentIndexTut + 1;

        //after seeing all the tutorial text, you move to the next state
        if (currentIndexTut === 5) {
            currentState = new Livingroom;
        }
    }

    mouseReleased() {

    }
}