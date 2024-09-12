document.addEventListener("DOMContentLoaded", () => {
  const startBtnNode = document.querySelector("#start-btn");
  const restartBtnNode = document.querySelector("#restart-btn");
  const introScreenNode = document.querySelector("#intro-screen");
  const gameScreenNode = document.querySelector("#game-screen");
  const gameBoxNode = document.querySelector("#game-box");
  const gameEndScreenNode = document.querySelector("#game-end");
  const scoreDisplayNode = document.querySelector("#score-display");
  const livesDisplayNode = document.querySelector("#lives-display");

  let playerObj = null;
  let coinsArray = [];
  let objectsArray = [];
  let coinFrequency = 2000;
  let objectFrequency = 1500;
  let gameIntervalId = null;
  let coinIntervalId = null;
  let objectIntervalId = null;
  let score = 0;
  let lives = 3;
  let speed = 3;
  let coinsCollected = 0;

  function startGame() {
    introScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    playerObj = new Player();
    gameIntervalId = setInterval(gameLoop, 1000 / 60);
    coinIntervalId = setInterval(addCoin, coinFrequency);
    objectIntervalId = setInterval(addObject, objectFrequency);
  }

  function gameLoop() {
    playerObj.move();
    coinsArray.forEach((coin) => coin.move());
    objectsArray.forEach((object) => object.move());
    detectCoinCollision();
    detectObjectCollision();
    updateSpeed();
  }

  function addCoin() {
    let newCoin = new Coin();
    coinsArray.push(newCoin);
  }

  function addObject() {
    let newObject = new Object();
    objectsArray.push(newObject);
  }

  function detectCoinCollision() {
    coinsArray.forEach((coin, index) => {
      if (isColliding(playerObj, coin)) {
        score += 20;
        coinsCollected++;
        scoreDisplayNode.innerText = `Score: ${score}`;
        coin.node.remove();
        coinsArray.splice(index, 1);
        if (coinsCollected % 5 === 0) {
          speed += 0.2;
        }
      }
    });
  }

  function detectObjectCollision() {
    objectsArray.forEach((object, index) => {
      if (isColliding(playerObj, object)) {
        lives -= 1;
        livesDisplayNode.innerText = `Lives: ${lives};`;
        object.node.remove();
        objectsArray.splice(index, 1);
        if (lives <= 0) {
          gameOver();
        }
      }
    });
  }

  function isColliding(obj1, obj2) {
    return !(
      obj1.x > obj2.x + obj2.w ||
      obj1.x + obj1.w < obj2.x ||
      obj1.y > obj2.y + obj2.h ||
      obj1.y + obj1.h < obj2.y
    );
  }

  function updateSpeed() {
    if (score > 100) speed = 4;
    if (score > 200) speed = 5;
  }

  function gameOver() {
    clearInterval(gameIntervalId);
    clearInterval(coinIntervalId);
    clearInterval(objectIntervalId);

    gameScreenNode.style.display = "none";
    gameEndScreenNode.style.display = "flex";
    document.querySelector(
      "#final-score"
    ).innerText = `Puntuación Final: ${score}`;
  }

  function restartGame() {
    gameEndScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";
    scoreDisplayNode.innerText = `Score: ${score}`;
    livesDisplayNode.innerText = `Lives: ${lives}`;
    score = 0;
    lives = 3;
    speed = 3;
    coinsCollected = 0;

    startGame();
  }

  startBtnNode.addEventListener("click", startGame);
  restartBtnNode.addEventListener("click", restartGame);
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      playerObj.attack();
    }
  });

  class Player {
    constructor() {
      this.node = document.createElement("div");
      this.node.classList.add("player");
      gameBoxNode.appendChild(this.node);
      this.x = 85;
      this.y = 550;
      this.w = 50;
      this.h = 50;
      this.node.style.left = `${this.x}px`;
      this.node.style.top = `${this.y}px`;
      this.speed = 8;

      document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft" && this.x > 0) {
          this.x -= this.speed;
        } else if (event.code === "ArrowRight" && this.x < 750 - this.w) {
          this.x += this.speed;
        }
        this.node.style.left = `${this.x}px`;
      });
    }

    move() {}

    attack() {
      objectsArray.forEach((object, index) => {
        if (isColliding(this, object)) {
          object.node.remove();
          objectsArray.splice(index, 1);
        }
      });
    }
  }

  class Coin {
    constructor() {
      this.node = document.createElement("div");
      this.node.classList.add("coin");
      gameBoxNode.appendChild(this.node);
      this.x = Math.random() * (750 - 50);
      this.y = -50;
      this.w = 50;
      this.h = 50;
      this.node.style.left = `${this.x}px`;
      this.node.style.top = `${this.y}px`;
      this.speed = speed;
    }

    move() {
      this.y += this.speed;
      if (this.y > 600) {
        this.node.remove();
        coinsArray.splice(coinsArray.indexOf(this), 1);
      }
      this.node.style.top = `${this.y}px`;
    }
  }

  class Object {
    constructor() {
      this.node = document.createElement("div");
      this.node.classList.add("object");
      gameBoxNode.appendChild(this.node);
      this.x = Math.random() * (750 - 50);
      this.y = -50;
      this.w = 50;
      this.h = 50;
      this.node.style.left = `${this.x}px`;
      this.node.style.top = `${this.y}px`;
      this.speed = speed;
    }

    move() {
      this.y += this.speed;
      if (this.y > 600) {
        this.node.remove();
        objectsArray.splice(objectsArray.indexOf(this), 1);
      }
      this.node.style.top = `${this.y}px`;
    }
  }
});
