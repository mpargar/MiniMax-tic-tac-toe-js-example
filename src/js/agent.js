class Agent extends Player {
  constructor(GameBoard, playerSymbol, itsMyTurn) {
    super(GameBoard, playerSymbol, itsMyTurn);
    this.state = this.gameBoardToState();
    if (this.itsMyTurn) {
      this.playAi();
    }
  }
  buttonObserve() {
    super.buttonObserve();
    this.state = this.gameBoardToState();
    if (this.itsMyTurn) {
      this.playAi();
    }
  }
  playAi() {
    const minMaxTree = new StateNode(null, this.state, this.playerSymbol);
    console.log(minMaxTree);
  }
  gameBoardToState() {
    return this.GameBoard.buttons.map((button) => {
      return button.innerHTML ? button.innerHTML : null;
    });
  }
}
