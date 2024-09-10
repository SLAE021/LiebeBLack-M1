window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    restartButton.addEventListener("click", function () {
      // Call the restartGame function when the button is clicked
      restartGame();
    });
  
    function startGame() {
      console.log("start game");
      game = new Game();
  
      game.start();
    }
  
    // The function that reloads the page to start a new game
    function restartGame() {
      location.reload();
    }
  
    // Function that handles keydown event
    function handleKeydown(event) {
        const key = event.key;
        const possibleKeystrokes = [
          "a",
          "w",
          "d",
          "s",
        ];
    
        // Check if the pressed key is in the possibleKeystrokes array
        if (possibleKeystrokes.includes(key)) {
          event.preventDefault();
    
          // Update player's directionX and directionY based on the key pressed
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
    
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
  };
  