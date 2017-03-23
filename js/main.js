
;(function () {
  function main() {
    //onclick="endTurnButton.visible = 0; rollButton.visible = 1;" 
    //onclick="rollButton.visible = 0; endTurnButton.visible = 1;" 
    // scale and clear canvas each frame
    if (inGame.gameState === -1) {
        main.stopMain = window.requestAnimationFrame( main );

        drawCanvas.maxWidth = window.innerWidth * 0.98;
        drawCanvas.maxHeight = window.innerHeight * 0.98;

        drawCanvas.canvas.width = drawCanvas.maxWidth;
        drawCanvas.canvas.height = drawCanvas.maxHeight;
        //drawCanvas.overlay.width = drawCanvas.maxWidth;
        //drawCanvas.overlay.height = drawCanvas.maxHeight;
        // --------------------------------------------------

        //draw polyMap
        polyMap.draw(); // draw poly map using universal drawScale
        // --------------------------------------------------
        //drawCanvas.drawScaleOverlay(inGame.overlayImage, 0, 0, 100, 100);
        drawCanvas.drawText("Start game", 30, 30, 2);

    } else if (inGame.gameState === 0 || inGame.gameState === 1) {


        main.stopMain = window.requestAnimationFrame( main );
        
        drawCanvas.maxWidth = window.innerWidth * 0.98;
        drawCanvas.maxHeight = window.innerHeight * 0.98;

        drawCanvas.canvas.width = drawCanvas.maxWidth;
        drawCanvas.canvas.height = drawCanvas.maxHeight;
        //drawCanvas.overlay.width = drawCanvas.maxWidth;
        //drawCanvas.overlay.height = drawCanvas.maxHeight;
        // --------------------------------------------------

        //draw polyMap
        polyMap.draw(); // draw poly map using universal drawScale
        // --------------------------------------------------
        
        //draw chips
        chip1.draw();
        chip2.draw();
        chip3.draw();
        chip4.draw();
        // --------------------------------------------------

        //draw button
        if (inGame.gameState === 0) {
            rollButton.draw(); // draw rollButton    
        } else if (inGame.gameState === 1) {
            endTurnButton.draw(); // draw endTurnButton
            rollDice.draw();
        };
        resetButton.draw();
        // --------------------------------------------------

        // draw Score:
        drawCanvas.drawScore(inGame.currentPlayer);
    } else if (inGame.gameState === 2) {
        
    };


        //-------------------------------
       // if (inGame.gameState == 1) {
         //   rollDice.draw();
        //};
        


  }

  main();
})();