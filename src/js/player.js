class Player {
  constructor(GameBoard, playerSymbol, itsMyTurn, humanPlay = true) {
    // Inicializar el jugador
    this.GameBoard = GameBoard;
    this.playerSymbol = playerSymbol;
    this.itsMyTurn = itsMyTurn;
    // Agregar los actuadores
    if (humanPlay) {
      this.GameBoard.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          this.play(button);
        });
      });
    }
    // Observadores
    this.observers = this.GameBoard.buttons.map((button) => {
      const observer = new MutationObserver((mutation) => {
        this.buttonObserve(mutation);
      });
      observer.observe(button, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      });
      return observer;
    });
  }
  buttonObserve(mutation) {
    this.itsMyTurn = !this.itsMyTurn;
  }
  play(button) {
    if (!button.innerHTML && this.itsMyTurn) {
      button.innerHTML = this.playerSymbol;
    }
  }
}
