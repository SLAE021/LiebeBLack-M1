// js/script.js
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    
    restartGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();

    game.start();
  }

 
  function restartGame() {
    location.reload();
  }

  
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "a",
      "w",
      "d",
      "s",
    ];

    
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      
      switch (key) {
        case "a":
          game.player.directionX = -2;
          break;
        case "w":
          game.player.directionY = -2;
          break;
        case "d":
          game.player.directionX = 2;
          break;
        case "s":
          game.player.directionY = 2;
          break;
      }
    }
  }

  
  window.addEventListener("keydown", handleKeydown);
};