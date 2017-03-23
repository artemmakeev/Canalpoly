var rollDice = {
    diceImg1 : document.getElementById("dice1"),
    diceImg2 : document.getElementById("dice2"),
    diceImg3 : document.getElementById("dice3"),
    diceImg4 : document.getElementById("dice4"),
    diceImg5 : document.getElementById("dice5"),
    diceImg6 : document.getElementById("dice6"),
    x1 : 11,
    y1 : 82.7,
    x2 : 7,
    y2 : 7,
    roll : function () {
        this.dice1 = Math.round((Math.random()) * 6 + 0.5);
        this.dice2 = Math.round((Math.random()) * 6 + 0.5);
        
        inGame.currentRoll = this.dice1 + this.dice2;
        
        
        // players 
        if (inGame.currentPlayer === 1) {
            chip1.x = keyS.posModify(chip1.pos, 1, chip1.x, inGame.currentRoll);
            chip1.moveCount++;
            chip1.animation = 1;
            chip4.animation = 0;
        } else if (inGame.currentPlayer === 2) {
            chip2.x = keyS.posModify(chip2.pos, 2, chip2.x, inGame.currentRoll);
            chip2.moveCount++;
            chip2.animation = 1;
            chip1.animation = 0;
        } else if (inGame.currentPlayer === 3) {
            chip3.x = keyS.posModify(chip3.pos, 3, chip3.x, inGame.currentRoll);
            chip3.moveCount++;
            chip3.animation = 1;
            chip2.animation = 0;
        } else if (inGame.currentPlayer === 4) {
            chip4.x = keyS.posModify(chip4.pos, 4, chip4.x, inGame.currentRoll);
            chip4.moveCount++;
            chip4.animation = 1;
            chip3.animation = 0;
        };/* else {
            inGame.currentPlayer = 1;
            chip1.x = keyS.posModify(chip1.pos, 1, chip1.x, inGame.currentRoll);
        };*/
        



    },
    endTurn : function () {
        if (inGame.currentPlayer === 1) {
            chip2.animation = 1;
            chip1.animation = 0;
            inGame.currentPlayer ++;
        } else if (inGame.currentPlayer === 2) {
            chip3.animation = 1;
            chip2.animation = 0;
            inGame.currentPlayer ++;
        } else if (inGame.currentPlayer === 3) {
            chip4.animation = 1;
            chip3.animation = 0;
            inGame.currentPlayer ++;
        } else if (inGame.currentPlayer === 4) {
            chip1.animation = 1;
            chip4.animation = 0;
            inGame.currentPlayer = 1;
        } else {
            inGame.currentPlayer = 1;
            chip1.x = keyS.posModify(chip1.pos, 1, chip1.x, inGame.currentRoll);
        };
    },
    draw : function () {

        for (var i = 1; i < 7; i++) {
            if (rollDice.dice1 == i) {
                drawCanvas.drawScale(eval("rollDice.diceImg" + i), this.x1, this.y1, this.x2, this.y2);
            };
            if (rollDice.dice1 == 7) {
                drawCanvas.drawScale(eval("rollDice.diceImg" + 6), this.x1, this.y1, this.x2, this.y2);
            };
            if (rollDice.dice2 == i) {
                drawCanvas.drawScale(eval("rollDice.diceImg" + i), this.x1 + 9, this.y1, this.x2, this.y2);
            };
            if (rollDice.dice2 == 7) {
                drawCanvas.drawScale(eval("rollDice.diceImg" + 6), this.x1, this.y1, this.x2, this.y2);
            };
            
        };

        
    },
    
};