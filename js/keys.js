var keyS = { // object that capture user input

// !!!!!!!move this to main loop!!!!!!!
	posModify : function(pos, chip, x, zeD) { // move this to main loop! wtf?
		position[pos][x] = 0;
		
        // if we could move through panama:
        if (((pos <= 7) && ((pos + zeD) > 7)) || ( (pos > 7) && ((((pos + zeD) > 53) && ((pos + zeD) < 108)) || (((pos + zeD) > 153) && ((pos + zeD) < 227)) || ((pos + zeD) > 253)) )) {
            inGame.gameState = 2;
            inGame.saveState();
        };
        //if (((pos <= 7) && ((pos + zeD) > 13) && ((pos + zeD) < 108)))
        // ((pos <= 7) && ((pos + zeD) > 13))
        // ((pos > 107) && (pos <= 113)) && ((pos + zeD) > 113)
        // ((pos <= 26) && (pos > 7)) && ((pos + zeD) > 26)
        // (pos <= 53) && (pos > 26) && ((pos + zeD) > 59)
        // if we could move through suez:

        //2. if pos > 7 && (pos + zeD) > 53 || (pos + zeD) > 153/253
		if ((pos + zeD) < 46) { //did not cross start with next move.
			switch (chip) {
				case 1:
					chip1.pos = chip1.pos + zeD;
					localStorage.setItem("chip" + chip, chip1.pos);
					break;
				case 2:
					chip2.pos = chip2.pos + zeD;
					localStorage.setItem("chip" + chip, chip2.pos);
					break;
				case 3:
					chip3.pos = chip3.pos + zeD;
					localStorage.setItem("chip" + chip, chip3.pos);
					break;
				case 4:
					chip4.pos = chip4.pos + zeD;
					localStorage.setItem("chip" + chip, chip4.pos);
					break;
			};
			pos = pos + zeD;
		} else if ((pos + zeD) > 45) { // did cross start
			switch (chip) {
				case 1:
					chip1.pos = chip1.pos + zeD - 46;
					chip1.score += 500;
					localStorage.setItem("chip" + chip, chip1.pos);
					break;
				case 2:
					chip2.pos = chip2.pos + zeD - 46;
					chip2.score += 500;
					localStorage.setItem("chip" + chip, chip2.pos);
					break;
				case 3:
					chip3.pos = chip3.pos + zeD - 46;
					chip3.score += 500;
					localStorage.setItem("chip" + chip, chip3.pos);
					break;
				case 4:
					chip4.pos = chip4.pos + zeD - 46;
					chip4.score += 500;
					localStorage.setItem("chip" + chip, chip4.pos);
					break;
			};
			pos = pos + zeD - 46;
		};
		
		if (position[pos][0] == 0) {
            position[pos][0] = 1;
            x = 0;
            localStorage.setItem("chipx" + chip, 0);
        } else if (position[pos][1] == 0) {
            position[pos][1] = 1;
            x = 1;
            localStorage.setItem("chipx" + chip, 1);
        } else if (position[pos][2] == 0) {
            position[pos][2] = 1;
            x = 2;
            localStorage.setItem("chipx" + chip, 2);
        } else if (position[pos][3] == 0) {
            position[pos][3] = 1;
            x = 3;
            localStorage.setItem("chipx" + chip, 3);
        } else if (position[pos][4] == 0) {
            position[pos][4] = 1;
            x = 4;
            localStorage.setItem("chipx" + chip, 4);
        } else if (position[pos][5] == 0) {
            position[pos][5] = 1;
            x = 5;
            localStorage.setItem("chipx" + chip, 5);
        } else if (position[pos][6] == 0) {
            position[pos][6] = 1;
            x = 6;
            localStorage.setItem("chipx" + chip, 6);
        } else if (position[pos][7] == 0) {
            position[pos][7] = 1;
            x = 7;
            localStorage.setItem("chipx" + chip, 7);
        } else if (position[pos][8] == 0) {
            position[pos][8] = 1;
            x = 8;
            localStorage.setItem("chipx" + chip, 8);
        };
        return x;
	},
// ^^^^^^^^^^!!!move this to main loop!!!^^^^^^^^^^

	click : function() {
		
        // Roll & End Turn buttons:
        var oveR = drawCanvas.scaleForHover(rollButton.x1, rollButton.y1, rollButton.x2, rollButton.y2);

		if (oveR === 1) {
            if (inGame.gameState === 1) {
            	rollButton.visible = 1;
            	endTurnButton.visible = 0;
            	rollDice.endTurn();
            	inGame.gameState = 0;
            	inGame.saveState();
                //$("#canvas").css("opacity", 0.5);
                //$("#overlay").css("display", "block");


            } else if (inGame.gameState === 0) {
            	rollButton.visible = 0;
            	endTurnButton.visible = 1;
            	rollDice.roll();

            	inGame.gameState = 1;
				inGame.saveState();
                //$("#canvas").css("opacity", 1);
                //$("#overlay").css("display", "none"); 
            };
            
        };

        var startNewGameButton = drawCanvas.scaleForHover(30, 27, 28, 6);
        if ((startNewGameButton === 1) && (inGame.gameState === -1)) {
            //$("#overlay").css("display", "none");
            $("#canvas").css("opacity", 1);
            inGame.gameState = 0;
            inGame.saveState();
        };

		var resetVar = drawCanvas.scaleForHover(resetButton.x1, resetButton.y1, resetButton.x2, resetButton.y2);
		if (resetVar === 1 && (inGame.gameState === 0 || inGame.gameState === 1)) {
			inGame.gameState = -1;
    		inGame.currentRoll = 0;
    		inGame.currentPlayer = 1;
			chip1.pos = 0; chip1.x = 0; chip1.score = 500;
        	chip2.pos = 0; chip2.x = 1; chip2.score = 500;
        	chip3.pos = 0; chip3.x = 2; chip3.score = 500;
        	chip4.pos = 0; chip4.x = 3; chip4.score = 500;
        	inGame.saveState();
            $("#canvas").css("opacity", 0.5);
            //$("#overlay").css("display", "block");
		};

        
	},
	doKeyDown : function(e) { 
		if (e.keyCode == 87) {// W key
			chip1.x = keyS.posModify(chip1.pos, 1, chip1.x, 1);
		} else if (e.keyCode == 69) { // E key
			chip2.x = keyS.posModify(chip2.pos, 2, chip2.x, 1);
		} else if (e.keyCode == 81) { // Q key
			chip3.x = keyS.posModify(chip3.pos, 3, chip3.x, 1);
		} else if (e.keyCode == 68) { // D key
			chip4.x = keyS.posModify(chip4.pos, 4, chip4.x, 1);
		}
	},

	getMousePos : function(e) {
	    var maxHeight = window.innerHeight * 0.98;
	    var maxWidth = window.innerWidth * 0.98;

		inGame.posX = e.clientX;
		inGame.posY = e.clientY;

		
	}
}