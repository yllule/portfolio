class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {

        //creating variables for the canvas width and height
        this.width = 1920;
        this.height = 1080;

        this.bell = this.sound.add('bell');

        //creating a variable for the background img
        this.bg = this.add.image(this.width/2, this.height/2, 'bg');

        //a shuffle function to randomize arrays
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        }

        //plant sprites. they are currently just used as pretty decoration, but originally I wanted to make them clickable and associate each plant to a task, like the customers
        this.plant1 = this.add.image(this.width/2-75, 335, 'p1a');
        this.plant2 = this.add.image(this.width/2+50, 315, 'p2a');
        this.plant3 = this.add.image(this.width/2+170, 300, 'p3a');
        this.plant4 = this.add.image(this.width/2+275, 325, 'p4a');
        this.plant5 = this.add.image(this.width/2+400, 305, 'p5a');
        this.plant6 = this.add.image(this.width/2+495, 310, 'p6a');
        this.plant7 = this.add.image(1635, 490, 'p7a');
        this.plant8 = this.add.image(1710, 540, 'p8a');
        this.plant9 = this.add.image(1760, 660, 'p9a');
        this.plant10 = this.add.image(1800, 810, 'p10a');
        this.plant11 = this.add.image(1850, 950, 'p11a');
        this.plant12 = this.add.image(370, 450, 'p12a');
        this.plant13 = this.add.image(290, 460, 'p13a');
        this.plant14 = this.add.image(210, 625, 'p14a');
        this.plant15 = this.add.image(130, 725, 'p15a');
        this.plant16 = this.add.image(50, 825, 'p16a');

        //checks if the customers have been tended to
        this.task1complete = false;
        this.task2complete = false;
        this.task3complete = false;
        this.task4complete = false;
        this.task5complete = false;
        this.task6complete = false;
        this.task7complete = false;
        this.task8complete = false;


        //npcs array and variables
        this.customers = [
        this.npc1 = this.add.image(450, this.height/2, 'npc1'),
        this.npc6 = this.add.image(this.width/2, this.height/2-50, 'npc6'),
        this.npc2 = this.add.image(1550, this.height/2, 'npc2'),
        this.npc3 = this.add.image(this.width/2, 805, 'npc3'),
        this.npc4 = this.add.image(this.width/2+350, 655, 'npc4'),
        this.npc5 = this.add.image(280, 900, 'npc5'),
        this.npc7 = this.add.image(1650, 930, 'npc7'),
        this.npc8 = this.add.image(700, 700, 'npc8'),
        ];

        //shuffle the npcs array
        shuffleArray(this.customers);

        //hide all npc sprites initially
        this.npc1.visible = false;
        this.npc2.visible = false;
        this.npc3.visible = false;
        this.npc4.visible = false;
        this.npc5.visible = false;
        this.npc6.visible = false;
        this.npc7.visible = false;
        this.npc8.visible = false;

        //making all npcs interactible
        this.customers.forEach(npc => {
            npc.setInteractive();
        });

        //setting a delay for each npc to appear
        let delay = 0;
        this.customers.forEach(npc => {
            //show one npc after the delay (starting off with one customer in the store)
            this.time.delayedCall(delay, () => {
                npc.visible = true;
                this.sound.play('bell', { volume: 0.2}); //making the sound volume lower
            }, [], this);
            //time interval between customers appearing
            delay += 10000;
        });

        //setting for dialogue box visuals
        const dialogueBox = this.add.graphics();
        dialogueBox.fillStyle(0xffffff, 0.8);
        dialogueBox.fillRoundedRect(700, 950, 600, 100, 20);
        dialogueBox.setDepth(1); //makes it go over all other elements
        
        //create text to display dialogue
        const dialogueText = this.add.text(720, 970, '', { fontFamily: 'Arial', fontSize: 20, color: '#FFFFFFF', wordWrap: { width: 560 }, align: 'center', padding: { x: 10 } });
        dialogueText.setDepth(2); //makes it go over dialogue box

        //all customer dialogue lines + array index
        const biscotteDialogue = [
            "Oh, hi there!",
            "I was just looking for a new houseplant to liven up my home.",
            "Something that is cat-friendly, ideally.",
            "In case I ever need a snack.",
            "What would you recommend?"
        ];

        let currentBiscotteDialogueIndex = 0;

        const miaDialogue = [
            "Hello.",
            "I'm looking to create a potion of explosion.",
            "For reasons...don't ask why.",
            "Ok, fine, it's for a new fishing technique I'm trying out. I call it fish blasting.",
            "Anyways, I heard that Coralfire Blooms are a great ingredient for enhancing the range of explosion.",
            "Do you happen to carry any in this store?"
        ]

        let currentMiaDialogueIndex = 0;

        const cirrusDialogue = [
            "Greetings.",
            "I'm looking to get a bouquet for my lover, it is our anniversary today.",
            "What would you recommend?"
        ]

        let currentCirrusDialogueIndex = 0;

        const enneaDialogue = [
            "Hewwo!",
            "Today is big sis' birfday.",
            "Big sis like cute purple triangle flower.",
            "You has?"
        ]

        let currentEnneaDialogueIndex = 0;

        const luceDialogue = [
            "Hm? Who are you? I've never seen you around here before.",
            "I see, so you're looking after Leora's shop while she attends to other matters.",
            "Ah, sorry, I was looking to speak to my sister and didn't expect to see a new face, much less a human.",
            "Hm? Ah, yes, Leora is my sibling. I wished to speak to her about a certain matter.",
            "Oh, yes. While it may not look like it, we are siblings created from the same mother.",
            "What? What's wrong with my wording? Yes, we were created, not birthed.",
            "Anyways, since she isn't here I may as well come back another time.",
            "When she comes back let her know I was looking for her."
        ]

        let currentLuceDialogueIndex = 0;

        const melanieDialogue = [
            "Ah...hello.",
            "Oh? I'm just looking around...",
            "Actually, I'm specifically looking for a plant that would do well in little to no light environments...",
            "...and that would be nutritious to insects, Biolume fireflies especially.",
            "Huh? Sorry if that is specific...I'm not sure if there even exists a plant like that.",
            "Due to being only a shadow of my former self, what is left of my body is very sensitive to light, so I live in a heavily forested area on the outskirts of town.",
            "Some Biolume fireflies seem to like that area as well, and I quite like their gentle glow. I was wondering if I could get them a little something if possible...",
            "Anyways, would you happen to have anything that would please them?"
        ]

        let currentMelanieDialogueIndex = 0;

        const seiDialogue = [
            "Hi...",
            "My little brother is sick, he ate a weird mushroom",
            "The doctor said he needs juice squeezed from a...",
            "Mammi...mamma...laria...?",
            "...a cactus with a long name.",
            "The doctor said it looks like two hand's palms stuck together with the fingers spread apart",
            "Do you have it here? Please, my brother needs it.",
            "I don't have much money, I hope this is enough..."
        ]

        let currentSeiDialogueIndex = 0;

        const witchDialogue = [
            "Ah, hello there dear...",
            "Is Leora not here?",
            "I see...that child has always been one to do her own thing.",
            "Then again...I suppose I am the same.",
            "I guess the apple doesn't fall far from the tree.",
            "Or better yet the seed doesn't fall far from the dandelion, in this case.",
            "Ah, anyways, I just came here to see her, it has been quite some time since I last visited.",
            "It is always strange to see our old home turned into a plant store, but I quite like it.",
            "It definitely is more livelier in here than back when we lived here.",
            "Anyways, I'll quit my rambling...",
            "Actually, it is not everyday that you meet a fellow human, are you not from here?",
            "I sense some otherworldly aether emanating from your form...",
            "Ah, I see, you're a newcomer to this world.",
            "Hm? You're wondering why I am surprised to see another human?",
            "Well, in case you haven't noticed before, most people in this world are humanoid creatures yes, but the population of actual humans has been dwindling down over the last century.",
            "There are currently only a handful of us left in this world...",
            "It's said that humans' hunger for power and riches led to their downfall.",
            "They bound and merged themselves to other beings and elements in hopes of attaining immortality.",
            "Anyways, I am rambling again. I'll spare you a history lesson and leave you to your work.",
            "At least you now have a better understanding of our world.",
            "I'll come visit another time in hopes of coming across Leora.",
            "It was nice speaking with you, dear. I hope you enjoy your time here."
        ]

        let currentWitchDialogueIndex = 0;

        //npc1 (biscotte) click event listener, shows dialogue after you click on her
        this.npc1.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(biscotteDialogue[currentBiscotteDialogueIndex]);
        
            //go to next dialogue line in index
            currentBiscotteDialogueIndex++;
        
            if (currentBiscotteDialogueIndex >= biscotteDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc1.on('pointerdown', () => this.scene.switch('npctask1'))
                //hide dialogue box when all dialogue lines are done
                if (currentBiscotteDialogueIndex > biscotteDialogue.length) {
                    //npc visibility is set back to false bcz they leave
                    this.npc1.visible = false;
                    dialogueBox.visible = false;
                    this.task1complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc2 (cirrus) click event listener
        this.npc2.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(cirrusDialogue[currentCirrusDialogueIndex]);
        
            //go to next dialogue line in index
            currentCirrusDialogueIndex++;
        
            if (currentCirrusDialogueIndex >= cirrusDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc2.on('pointerdown', () => this.scene.switch('npctask2'))
                //hide dialogue box when all dialogue lines are done
                if (currentCirrusDialogueIndex > cirrusDialogue.length) {
                    this.npc2.visible = false;
                    dialogueBox.visible = false;
                    this.task2complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc3 (ennea) click event listener
        this.npc3.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(enneaDialogue[currentEnneaDialogueIndex]);
        
            //go to next dialogue line in index
            currentEnneaDialogueIndex++;
        
            if (currentEnneaDialogueIndex >= enneaDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc3.on('pointerdown', () => this.scene.switch('npctask3'))
                //hide dialogue box when all dialogue lines are done
                if (currentEnneaDialogueIndex > enneaDialogue.length) {
                    this.npc3.visible = false;
                    dialogueBox.visible = false;
                    this.task3complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc4 (luce) click event listener
        this.npc4.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(luceDialogue[currentLuceDialogueIndex]);
        
            //go to next dialogue line in index
            currentLuceDialogueIndex++;
        
                if (currentLuceDialogueIndex > luceDialogue.length) {
                    this.npc4.visible = false;
                    dialogueBox.visible = false;
                    this.task4complete = true;
                    this.checkAllTasksCompleted();
                }
        });

        //npc5 (melanie) click event listener
        this.npc5.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(melanieDialogue[currentMelanieDialogueIndex]);
        
            //go to next dialogue line in index
            currentMelanieDialogueIndex++;
        
            if (currentMelanieDialogueIndex >= melanieDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc5.on('pointerdown', () => this.scene.switch('npctask5'))
                //hide dialogue box when all dialogue lines are done
                if (currentMelanieDialogueIndex > melanieDialogue.length) {
                    this.npc5.visible = false;
                    dialogueBox.visible = false;
                    this.task5complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc6 (mia) click event listener
        this.npc6.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(miaDialogue[currentMiaDialogueIndex]);
        
            //go to next dialogue line in index
            currentMiaDialogueIndex++;
        
            if (currentMiaDialogueIndex >= miaDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc6.on('pointerdown', () => this.scene.switch('npctask6'))
                //hide dialogue box when all dialogue lines are done
                if (currentMiaDialogueIndex > miaDialogue.length) {
                    this.npc6.visible = false;
                    dialogueBox.visible = false;
                    this.task6complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc7 (sei) click event listener
        this.npc7.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(seiDialogue[currentSeiDialogueIndex]);
        
            //go to next dialogue line in index
            currentSeiDialogueIndex++;
        
            if (currentSeiDialogueIndex >= seiDialogue.length) {
                //when you click on npc img, switches to scene called npctask
                this.npc7.on('pointerdown', () => this.scene.switch('npctask7'))
                //hide dialogue box when all dialogue lines are done
                if (currentSeiDialogueIndex > seiDialogue.length) {
                    this.npc7.visible = false;
                    dialogueBox.visible = false;
                    this.task7complete = true;
                    this.checkAllTasksCompleted();
                }
            }
        });

        //npc8 (witch) click event listener
        this.npc8.on('pointerdown', () => {
            //show dialogue box
            dialogueBox.visible = true;
        
            //display the dialogue at the current index
            dialogueText.setText(witchDialogue[currentWitchDialogueIndex]);
        
            //go to next dialogue line in index
            currentWitchDialogueIndex++;

            if (currentWitchDialogueIndex > witchDialogue.length) {
                this.npc8.visible = false;
                dialogueBox.visible = false;
                this.task8complete = true;
                this.checkAllTasksCompleted();
            }

        });
        
        //hide dialogue box initially
        dialogueBox.visible = false;

        // this.plant1.on('pointerdown', () => this.scene.switch('plant1task'))

    }

    update() {

    }
    //checks if all tasks are complete after a task has been completed
    checkAllTasksCompleted() {
        if (this.task1complete && this.task2complete && this.task3complete && this.task4complete && this.task5complete && this.task6complete && this.task7complete && this.task8complete) {
            const dialogueBox2 = this.add.graphics();
            dialogueBox2.fillStyle(0xffffff, 0.8);
            dialogueBox2.fillRoundedRect(700, 950, 600, 100, 20);
            dialogueBox2.setDepth(1); //makes it go over all other elements
            
            //create text to display dialogue
            const dialogueText = this.add.text(720, 970, '', { fontFamily: 'Arial', fontSize: 20, color: '#FFFFFFF', wordWrap: { width: 560 }, align: 'center', padding: { x: 10 } });
            dialogueText.setDepth(2); //makes it go over dialogue box
            dialogueText.setText("You've tended to all the customers for the day. (End of the game");
        }
    }
}