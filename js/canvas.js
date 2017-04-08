var drawCanvas = { // draw objects on canvas, animate and scale it.

    canvas : document.getElementById("canvas"),
    overlay : document.getElementById("overlay"),
    maxHeight : window.innerHeight * 0.98,
    maxWidth : window.innerWidth * 0.98,

    ctx : canvas.getContext("2d"),
    overlayCtx : overlay.getContext("2d"),

    drawBtn : function (btN, btnOn, xPercent, yPercent, xScale, yScale) {
        
        var oveR = drawCanvas.scaleForHover(xPercent, yPercent, xScale, yScale);

        if (oveR === 0) {
            drawCanvas.drawScale(btN, xPercent, yPercent, xScale, yScale);
        } else {
            drawCanvas.drawScale(btnOn, xPercent, yPercent, xScale, yScale);
        }
        
        
    },

    drawChip : function (chip, pos, chipX, z) { // chip - image, pos - position on field, chipX - chip#.x, ie position within same block z - animation
        var d = performance.now();
        var x, y;
        var aniCon = Math.sin(d * 0.005) / 2 + 0.5; // pulse animation for chips
        
        
        if (chipX == 0) {
            x = 0;
            y = 0;
        } else if (chipX == 1) {
            x = -3;
            y = -3;
        } else if (chipX == 2) {
            x = 3;
            y = 3;
        } else if (chipX == 3) {
            x = 3;
            y = -3;
        } else if (chipX == 4) {
            x = -3;
            y = 3;
        } else if (chipX == 5) {
            x = 0;
            y = -3;
        } else if (chipX == 6) {
            x = 0;
            y = 3;
        } else if (chipX == 7) {
            x = -3;
            y = 0;
        } else if (chipX == 8) {
            x = 3;
            y = 0;
        };

        if (pos < 100) {
            var xPercent = blocksM[pos][0] - aniCon * 0.5 * z;
            var yPercent = blocksM[pos][1] - aniCon * 0.5 * z;
        } else if ((pos > 100) && (pos < 200)) {
            var xPercent = blocksPanamaM[pos - 108][0] - aniCon * 0.5 * z;
            var yPercent = blocksPanamaM[pos - 108][1] - aniCon * 0.5 * z;
        } else {
            var xPercent = blocksSuezM[pos - 227][0] - aniCon * 0.5 * z;
            var yPercent = blocksSuezM[pos - 227][1] - aniCon * 0.5 * z;
        };

       // var xPercent = blocksM[pos][0] - aniCon * 0.5 * z;
        //var yPercent = blocksM[pos][1] - aniCon * 0.5 * z;
        var xScale = 4.6 + aniCon * z;
        var yScale = 4.6 + aniCon * z;
        drawCanvas.drawScale(chip, xPercent + x, yPercent + y, xScale, yScale);
    },
    drawScore : function (curPlayer) {
        var curScore;
        switch (curPlayer) {
            case 1: 
                curScore = chip1.score;
                break;
            case 2: 
                curScore = chip2.score;
                break;
            case 3: 
                curScore = chip3.score;
                break;
            case 4: 
                curScore = chip4.score;
                break;
            default: curScore = chip1.score;

        };
        var xPercent = 10;
        var yPercent = 40;
        var xyScale = 1;
        
        drawCanvas.drawText("Score: " + curScore, xPercent, yPercent, xyScale);
    },
    

    drawScale : function (img, xPercent, yPercent, xScale, yScale) {
        
        var xW, yW, xH, yH, lsX, lsY, poX, poY, polsCo, squareCo;
        xW = polyMap.img.width * drawCanvas.maxHeight / polyMap.img.height;  // landscape map width
        yW = polyMap.img.height * drawCanvas.maxHeight / polyMap.img.height; // landscape map height
        xH = polyMap.img.width * drawCanvas.maxWidth / polyMap.img.width;    // portrait map width
        yH = polyMap.img.height * drawCanvas.maxWidth / polyMap.img.width;   // portrait map height

        lsX = (drawCanvas.maxWidth - xW) / 2; // X coordinate for landscape
        lsY = (drawCanvas.maxHeight - yW) / 2;// Y coordinate for landscape
        poX = (drawCanvas.maxWidth - xH) / 2; // X coordinate for portrait
        poY = (drawCanvas.maxHeight - yH) / 2;// Y coordinate for portrait

        // add center for right/left controls
        // add center for top/bottom controls
        // add center for right/bottom controls

        polsCo = 1; // empty space coefficient in Landscape and Portrait orientations
        squareCo = 1;// empty space coefficient in square.

        if (drawCanvas.maxWidth > drawCanvas.maxHeight * polsCo) {
            drawCanvas.ctx.drawImage(img, lsX + xPercent * xW * 0.01, lsY + yPercent * yW * 0.01, xW * 0.01 * xScale, yW * 0.01 * yScale);
        } else if (drawCanvas.maxHeight > drawCanvas.maxWidth * polsCo) {
            drawCanvas.ctx.drawImage(img, poX + xPercent * xH * 0.01, poY + yPercent * yH * 0.01, xH * 0.01 * xScale, yH * 0.01 * yScale);
        } else if (drawCanvas.maxWidth > drawCanvas.maxHeight) {
            drawCanvas.ctx.drawImage(img, xW * squareCo * 0.01 * xPercent, yW * squareCo * 0.01 * yPercent, xW * squareCo * 0.01 * xScale, yW * squareCo * 0.01 * yScale);
        } else {
            drawCanvas.ctx.drawImage(img, xH * squareCo * 0.01 * xPercent, yH * squareCo * 0.01 * yPercent, xH * squareCo * 0.01 * xScale, yH * squareCo * 0.01 * yScale);
        }
    },
    drawScaleOverlay : function (img, xPercent, yPercent, xScale, yScale) {
        
        var xW, yW, xH, yH, lsX, lsY, poX, poY, polsCo, squareCo;
        xW = polyMap.img.width * drawCanvas.maxHeight / polyMap.img.height;  // landscape map width
        yW = polyMap.img.height * drawCanvas.maxHeight / polyMap.img.height; // landscape map height
        xH = polyMap.img.width * drawCanvas.maxWidth / polyMap.img.width;    // portrait map width
        yH = polyMap.img.height * drawCanvas.maxWidth / polyMap.img.width;   // portrait map height

        lsX = (drawCanvas.maxWidth - xW) / 2; // X coordinate for landscape
        lsY = (drawCanvas.maxHeight - yW) / 2;// Y coordinate for landscape
        poX = (drawCanvas.maxWidth - xH) / 2; // X coordinate for portrait
        poY = (drawCanvas.maxHeight - yH) / 2;// Y coordinate for portrait

        // add center for right/left controls
        // add center for top/bottom controls
        // add center for right/bottom controls

        polsCo = 1; // empty space coefficient in Landscape and Portrait orientations
        squareCo = 1;// empty space coefficient in square.

        if (drawCanvas.maxWidth > drawCanvas.maxHeight * polsCo) {
            drawCanvas.overlayCtx.drawImage(img, lsX + xPercent * xW * 0.01, lsY + yPercent * yW * 0.01, xW * 0.01 * xScale, yW * 0.01 * yScale);
        } else if (drawCanvas.maxHeight > drawCanvas.maxWidth * polsCo) {
            drawCanvas.overlayCtx.drawImage(img, poX + xPercent * xH * 0.01, poY + yPercent * yH * 0.01, xH * 0.01 * xScale, yH * 0.01 * yScale);
        } else if (drawCanvas.maxWidth > drawCanvas.maxHeight) {
            drawCanvas.overlayCtx.drawImage(img, xW * squareCo * 0.01 * xPercent, yW * squareCo * 0.01 * yPercent, xW * squareCo * 0.01 * xScale, yW * squareCo * 0.01 * yScale);
        } else {
            drawCanvas.overlayCtx.drawImage(img, xH * squareCo * 0.01 * xPercent, yH * squareCo * 0.01 * yPercent, xH * squareCo * 0.01 * xScale, yH * squareCo * 0.01 * yScale);
        }
    },
    drawText : function (text2Show, xPercent, yPercent, xyScale) {

        var xW, yW, xH, yH, lsX, lsY, poX, poY, polsCo, squareCo;
        xW = polyMap.img.width * drawCanvas.maxHeight / polyMap.img.height;  // landscape map width
        yW = polyMap.img.height * drawCanvas.maxHeight / polyMap.img.height; // landscape map height
        xH = polyMap.img.width * drawCanvas.maxWidth / polyMap.img.width;    // portrait map width
        yH = polyMap.img.height * drawCanvas.maxWidth / polyMap.img.width;   // portrait map height

        lsX = (drawCanvas.maxWidth - xW) / 2; // X coordinate for landscape
        lsY = (drawCanvas.maxHeight - yW) / 2;// Y coordinate for landscape
        poX = (drawCanvas.maxWidth - xH) / 2; // X coordinate for portrait
        poY = (drawCanvas.maxHeight - yH) / 2;// Y coordinate for portrait

        // add center for right/left controls
        // add center for top/bottom controls
        // add center for right/bottom controls

        polsCo = 1; // empty space coefficient in Landscape and Portrait orientations
        squareCo = 1;// empty space coefficient in square.
        drawCanvas.ctx.fillStyle = "red";
        if (drawCanvas.maxWidth > drawCanvas.maxHeight * polsCo) {
            drawCanvas.ctx.font = drawCanvas.maxHeight * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.ctx.fillText(text2Show, lsX + xPercent * xW * 0.01, lsY + yPercent * yW * 0.01);

        } else if (drawCanvas.maxHeight > drawCanvas.maxWidth * polsCo) {
            drawCanvas.ctx.font = drawCanvas.maxWidth * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.ctx.fillText(text2Show, poX + xPercent * xH * 0.01, poY + yPercent * yH * 0.01);
        } else if (drawCanvas.maxWidth > drawCanvas.maxHeight) {
            drawCanvas.ctx.font = drawCanvas.maxHeight * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.ctx.fillText(text2Show, xW * squareCo * 0.01 * xPercent, yW * squareCo * 0.01 * yPercent);
        } else {
            drawCanvas.ctx.font = drawCanvas.maxWidth * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.ctx.fillText(text2Show, xH * squareCo * 0.01 * xPercent, yH * squareCo * 0.01 * yPercent);
        }
    },
    drawTextOverlay : function (text2Show, xPercent, yPercent, xyScale) {

        var xW, yW, xH, yH, lsX, lsY, poX, poY, polsCo, squareCo;
        xW = polyMap.img.width * drawCanvas.maxHeight / polyMap.img.height;  // landscape map width
        yW = polyMap.img.height * drawCanvas.maxHeight / polyMap.img.height; // landscape map height
        xH = polyMap.img.width * drawCanvas.maxWidth / polyMap.img.width;    // portrait map width
        yH = polyMap.img.height * drawCanvas.maxWidth / polyMap.img.width;   // portrait map height

        lsX = (drawCanvas.maxWidth - xW) / 2; // X coordinate for landscape
        lsY = (drawCanvas.maxHeight - yW) / 2;// Y coordinate for landscape
        poX = (drawCanvas.maxWidth - xH) / 2; // X coordinate for portrait
        poY = (drawCanvas.maxHeight - yH) / 2;// Y coordinate for portrait

        // add center for right/left controls
        // add center for top/bottom controls
        // add center for right/bottom controls

        polsCo = 1; // empty space coefficient in Landscape and Portrait orientations
        squareCo = 1;// empty space coefficient in square.
        drawCanvas.overlayCtx.fillStyle = "white";
        if (drawCanvas.maxWidth > drawCanvas.maxHeight * polsCo) {
            drawCanvas.overlayCtx.font = drawCanvas.maxHeight * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.overlayCtx.fillText(text2Show, lsX + xPercent * xW * 0.01, lsY + yPercent * yW * 0.01);

        } else if (drawCanvas.maxHeight > drawCanvas.maxWidth * polsCo) {
            drawCanvas.overlayCtx.font = drawCanvas.maxWidth * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.overlayCtx.fillText(text2Show, poX + xPercent * xH * 0.01, poY + yPercent * yH * 0.01);
        } else if (drawCanvas.maxWidth > drawCanvas.maxHeight) {
            drawCanvas.overlayCtx.font = drawCanvas.maxHeight * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.overlayCtx.fillText(text2Show, xW * squareCo * 0.01 * xPercent, yW * squareCo * 0.01 * yPercent);
        } else {
            drawCanvas.overlayCtx.font = drawCanvas.maxWidth * 0.03 * xyScale + "px Comic Sans MS";
            drawCanvas.overlayCtx.fillText(text2Show, xH * squareCo * 0.01 * xPercent, yH * squareCo * 0.01 * yPercent);
        }
    },

    scaleForHover : function (xPercent, yPercent, xScale, yScale) {
    // converting percentage coordinates to 
        var xW, yW, xH, yH, lsX, lsY, poX, poY, polsCo, squareCo;
        xW = polyMap.img.width * drawCanvas.maxHeight / polyMap.img.height;  // landscape map width
        yW = polyMap.img.height * drawCanvas.maxHeight / polyMap.img.height; // landscape map height
        xH = polyMap.img.width * drawCanvas.maxWidth / polyMap.img.width;    // portrait map width
        yH = polyMap.img.height * drawCanvas.maxWidth / polyMap.img.width;   // portrait map height

        lsX = (drawCanvas.maxWidth - xW) / 2; // X coordinate for landscape
        lsY = (drawCanvas.maxHeight - yW) / 2;// Y coordinate for landscape
        poX = (drawCanvas.maxWidth - xH) / 2; // X coordinate for portrait
        poY = (drawCanvas.maxHeight - yH) / 2;// Y coordinate for portrait

        // add center for right/left controls
        // add center for top/bottom controls
        // add center for right/bottom controls

        var xHoverW = lsX + xPercent * xW * 0.01;
        var xHoverWend = xHoverW + xW * 0.01 * xScale;

        var yHoverW = lsY + yPercent * yW * 0.01;
        var yHoverWend = yHoverW + yW * 0.01 * yScale;

        var xHoverH = poX + xPercent * xH * 0.01;
        var xHoverHend = xHoverH + xH * 0.01 * xScale;

        var yHoverH = poY + yPercent * yH * 0.01;
        var yHoverHend = yHoverH + yH * 0.01 * yScale;

        var xHoverWsq = xW * squareCo * 0.01 * xPercent;
        var xHoverWsqEnd = xHoverWsq + xW * squareCo * 0.01 * xScale;

        var yHoverWsq = yW * squareCo * 0.01 * yPercent;
        var yHoverWsqEnd = yHoverWsq + yW * squareCo * 0.01 * yScale;

        var xHoverHsq = xH * squareCo * 0.01 * xPercent;
        var xHoverHsqEnd = xHoverHsq + xH * squareCo * 0.01 * xScale;

        var yHoverHsq = yH * squareCo * 0.01 * yPercent;
        var yHoverHsqEnd = yHoverHsq + yH * squareCo * 0.01 * yScale;


        polsCo = 1; // empty space coefficient in Landscape and Portrait orientations
        squareCo = 1;// empty space coefficient in square.


        if (drawCanvas.maxWidth > drawCanvas.maxHeight * polsCo) {
            if((inGame.posX > xHoverW) && (inGame.posX < xHoverWend) && (inGame.posY > yHoverW) && (inGame.posY < yHoverWend) ){
                return 1;
            } else { return 0;}
        } else if (drawCanvas.maxHeight > drawCanvas.maxWidth * polsCo) {
            if((inGame.posX > xHoverH) && (inGame.posX < xHoverHend) && (inGame.posY > yHoverH) && (inGame.posY < yHoverHend) ){
                return 1;
            } else { return 0;}
        } else if (drawCanvas.maxWidth > drawCanvas.maxHeight) {
            if((inGame.posX > xHoverWsq) && (inGame.posX < xHoverWsqEnd) && (inGame.posY > yHoverWsq) && (inGame.posY < yHoverWsqEnd) ){
                return 1;
            } else { return 0;}
        } else {
            if((inGame.posX > xHoverHsq) && (inGame.posX < xHoverHsqEnd) && (inGame.posY > yHoverHsq) && (inGame.posY < yHoverHsqEnd) ){
                return 1;
            } else { return 0;}
        }
    },

}