class Ending {
        constructor() {
    
            //variable for title text
            this.titleString = 'Grow a Pet!'
            this.textString = 'Thanks for playing! Click to restart.'
            this.creditString = 'Audio by : waveplaySFX, Prof.Mudkip, jeckkech, InspectorJ and Electrobuz on Freesound.org';
    
        }
    
        draw() {
    
            background(0);

            //text display
            push();
            fill(255);
            textSize(100);
            text(this.titleString, width/2+100, height/2-100);
            pop();

            push();
            fill(255);
            textSize(50);
            text(this.textString, width/2+265, height/2);
            pop();

            push();
            fill(255);
            textSize(20);
            text(this.creditString, width/2, height-100);
            pop();

            push();
            imageMode(CENTER);
            blendMode(REMOVE);
            image(flowerImg, width/3, height/2, 275, 325);
            pop();
        }
    
    
        mousePressed() {

            currentState = new Title;

        }
}