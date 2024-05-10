class Livingroom {
    constructor() {

    }

    draw() {
        //images
        push();
        imageMode(CENTER);
        image(livingRoomImg, width/2, height/2);
        image(arrowImg, width-75, height-75);
        image(arrow2Img, 75, height-75);
        if(spiritBoxOn) {
            image(handImg, width-50, height/2+100);
            image(notesImg, 75, height/2+100);
        }
        pop();
    }

    mousePressed() {
        spiritBoxOn = true;
    }

    mouseReleased() {
        spiritBoxOn = false;
        staticbg.stop();
        staticvoices.stop();
    }

    keyPressed() {
        if (keyCode === LEFT_ARROW) {
            currentState = new Diningroom;
        }

        if (keyCode === RIGHT_ARROW) {
            currentState = new Hallway;
        }
    }

    scare() {
        //random shadow appears
        image(shadowImg, width/2, height/2-75);
    }
}