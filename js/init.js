
var inGame = {
    // *** variables ***

    posX : 0, //mouseX
    posY : 0, //mouseY
    gameState : 0,

    overlayImage : document.getElementById("chip9"),
    // currentRoll : 0,
    //currentPlayer : 1,
    // *** variables ***



    iniT : function() {

        for (i = 0; i < 201; i++) { // initialising position values
            for (j = 0; j < 10; j++) {
                if (!position[i]) {
                    position[i] = [];
                };
                position[i][j] = 0;
                
                 
            };
        };


//restore gamestate
        if (localStorage.getItem("chip1") === null) {
            chip1.pos = 0;
            localStorage.setItem("chip1", 0);
        } else {
            chip1.pos = eval(localStorage.getItem("chip1")); 
            

        };
        if (!localStorage.getItem("chip2")) {
            chip2.pos = 0;
            localStorage.setItem("chip2", 0);
        } else {
            chip2.pos = eval(localStorage.getItem("chip2"));
        };
        if (!localStorage.getItem("chip3")) {
            chip3.pos = 0;
            localStorage.setItem("chip3", 0);
        } else {
            chip3.pos = eval(localStorage.getItem("chip3"));
        };
        if (!localStorage.getItem("chip4")) {
            chip4.pos = 0;
            localStorage.setItem("chip4", 0);
        } else {
            chip4.pos = eval(localStorage.getItem("chip4"));
        };
    


        if (!localStorage.getItem("chipx1")) {
            chip1.x = 0;
            localStorage.setItem("chipx1", 0);
        } else {
            chip1.x = eval(localStorage.getItem("chipx1"));
        };
        if (!localStorage.getItem("chipx2")) {
            chip2.x = 1;
            localStorage.setItem("chipx2", 0);
        } else {
            chip2.x = eval(localStorage.getItem("chipx2"));
        };
        if (!localStorage.getItem("chipx3")) {
            chip3.x = 2;
            localStorage.setItem("chipx3", 0);
        } else {
            chip3.x = eval(localStorage.getItem("chipx3"));
        };
        if (!localStorage.getItem("chipx4")) {
            chip4.x = 3;
            localStorage.setItem("chipx4", 0);
        } else {
            chip4.x = eval(localStorage.getItem("chipx4"));
        };

        if (!localStorage.getItem("chipScore1")) {
            chip1.score = 500;
            localStorage.setItem("chipScore1", 500);
        } else {
            chip1.score = eval(localStorage.getItem("chipScore1"));
        };
        if (!localStorage.getItem("chipScore2")) {
            chip2.score = 500;
            localStorage.setItem("chipScore2", 500);
        } else {
            chip2.score = eval(localStorage.getItem("chipScore2"));
        };
        if (!localStorage.getItem("chipScore3")) {
            chip3.score = 500;
            localStorage.setItem("chipScore3", 500);
        } else {
            chip3.score = eval(localStorage.getItem("chipScore3"));
        };
        if (!localStorage.getItem("chipScore4")) {
            chip4.score = 500;
            localStorage.setItem("chipScore4", 500);
        } else {
            chip4.score = eval(localStorage.getItem("chipScore4"));
        };


        // 
        /*
        if (localStorage.getItem("gameState") === null) {
            this.gameState = 0;
            localStorage.setItem("gameState", 0);
        } else {
            this.gameState = eval(localStorage.getItem("gameState")); 
        };*/
        chip1.moveCount = eval(localStorage.getItem("chipMove1"));
        chip2.moveCount = eval(localStorage.getItem("chipMove2"));
        chip3.moveCount = eval(localStorage.getItem("chipMove3"));
        chip4.moveCount = eval(localStorage.getItem("chipMove4"));

        inGame.gameState = eval(localStorage.getItem("gameState"));
        inGame.currentRoll = eval(localStorage.getItem("currentRoll"));
        inGame.currentPlayer = eval(localStorage.getItem("currentPlayer"));
        if (inGame.gameState === -1) {
            $("#canvas").css("opacity", 0.5);
        } else {
            $("#canvas").css("opacity", 1);
        };

        //inGame.gameState = 0;
        //inGame.currentRoll = 0;
        //inGame.currentPlayer = 1;
        //chip1.pos = 0; chip1.x = 0;
        //chip2.pos = 0; chip2.x = 1;
        //chip3.pos = 0; chip3.x = 2;
        //chip4.pos = 0; chip4.x = 3;
        //inGame.saveState();
/*    if (typeof localStorage.getItem("pos" + i + j) === "undefined") {
        position[0][0] = 1; // start positions for 4 chips
        localStorage.setItem("pos" + 0 + 0, 1);
        position[0][1] = 1;
        localStorage.setItem("pos" + 0 + 1, 1);
        position[0][2] = 1;
        localStorage.setItem("pos" + 0 + 2, 1);
        position[0][3] = 1;
        localStorage.setItem("pos" + 0 + 3, 1);
    } else {

    }; */
        window.addEventListener("keydown", keyS.doKeyDown, true);
        /*$("#overlay").click(function() {
            $(this).hide();
        }); */
    

    
    
    },
    saveState : function() {
        for (var i = 1; i < 5; i++) {
            localStorage.setItem("chip" + i, eval("chip" + i + ".pos"));
            localStorage.setItem("chipx" + i, eval("chip" + i + ".x"));
            localStorage.setItem("chipScore" + i, eval("chip" + i + ".score"));
            localStorage.setItem("chipMove" + i, eval("chip" + i + ".moveCount"));
        };
        localStorage.setItem("gameState", inGame.gameState);
        localStorage.setItem("currentRoll", inGame.currentRoll);
        localStorage.setItem("currentPlayer", inGame.currentPlayer);
        
        

    }
};

var polyMap = {
    x1 : 0,
    y1 : 0,
    x2 : 100,
    y2 : 100,
    img : document.getElementById("nmap"),
    draw : function () {
        drawCanvas.drawScale(this.img, this.x1, this.y1, this.x2, this.y2);
    }

};

var rollButton = {
    x1 : 45.5,
    y1 : 41,
    x2 : 14,
    y2 : 9,
    visible : 1,
    img : document.getElementById("rollBtn"),
    imgOn : document.getElementById("rollBtnOn"),
    draw : function () {
        drawCanvas.drawBtn(this.img, this.imgOn, this.x1, this.y1, this.x2, this.y2);
    }

};
var endTurnButton = {
    x1 : 45.5,
    y1 : 41,
    x2 : 14,
    y2 : 9,
    visible : 0,
    img : document.getElementById("endTurn"),
    imgOn : document.getElementById("endTurnOn"),
    draw : function () {
        drawCanvas.drawBtn(this.img, this.imgOn, this.x1, this.y1, this.x2, this.y2);
    }
};

var resetButton = {
    x1 : 43,
    y1 : 90,
    x2 : 10,
    y2 : 7,
    visible : 0,
    img : document.getElementById("resetBtn"),
    imgOn : document.getElementById("resetOn"),
    draw : function () {
        drawCanvas.drawBtn(this.img, this.imgOn, this.x1, this.y1, this.x2, this.y2);
    }
};




/*
var player1 = {
    score : 500,
    chip : 1
};

var player2 = {
    score : 500,
    chip : 2
};

var player3 = {
    score : 500,
    chip : 3
};

var player4 = {
    score : 500,
    chip : 4
};*/
var chip1 = {
    img : document.getElementById("chip1"),
    pos : 0,
    x : 0,
    animation : 0,
    score : 500,
    moveCount : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos, this.x, this.animation);
    }
};

var chip2 = {
    img : document.getElementById("chip2"),
    pos : 0,
    x : 1,
    animation : 0,
    score: 500,
    moveCount : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos, this.x, this.animation);
    }
};
var chip3 = {
    img : document.getElementById("chip3"),
    pos : 0,
    x : 2,
    animation : 0,
    score: 500,
    moveCount : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos, this.x, this.animation);
    }
};
var chip4 = {
    img : document.getElementById("chip4"),
    pos : 0,
    x : 3,
    animation : 0,
    score: 500,
    moveCount : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos, this.x, this.animation);
    }
};
var chip5 = {
    img : document.getElementById("chip5"),
    pos : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos);
    }
};
var chip6 = {
    img : document.getElementById("chip6"),
    pos : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos);
    }
};
var chip7 = {
    img : document.getElementById("chip7"),
    pos : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos);
    }
};
var chip8 = {
    img : document.getElementById("chip8"),
    pos : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos);
    }
};
var chip9 = {
    img : document.getElementById("chip9"),
    pos : 0,
    draw : function () {
        drawCanvas.drawChip(this.img, this.pos);
    }
};
