class Agent extends Player {
  constructor(GameBoard, playerSymbol, itsMyTurn) {
    super(GameBoard, playerSymbol, itsMyTurn, false);
    this.state = this.gameBoardToState();
    if (this.itsMyTurn) {
      this.playAi();
    }
  }
  buttonObserve() {
    super.buttonObserve();
    this.state = this.gameBoardToState();
    if (this.itsMyTurn) {
      this.playAi()
    }
  }
  playAi() {
    setTimeout(() => {
      const minMaxTree = new StateNode(null, this.state, this.playerSymbol);
      if(!this.validateNodeGameStatus(minMaxTree)) {
        const bestPlay = minMaxTree.getNextBestState();
        this.play(this.GameBoard.buttons[bestPlay.lastPlay]);
        this.validateNodeGameStatus(bestPlay);
      }
    },100)
  }
  gameBoardToState() {
    return this.GameBoard.buttons.map((button) => {
      return button.innerHTML ? button.innerHTML : null;
    });
  }
  validateNodeGameStatus(node) {
    if (node.type === NODE_ENUMS.FINAl) {
      if(node.value < 0) {
        if(this.playerSymbol === NODE_ENUMS.MIN) {
          alert("Gané >:D");
        } else {
          alert("Perdí? :O");
        }
      } else if(node.value > 0) {
        if(this.playerSymbol === NODE_ENUMS.MAX) {
          alert("Gané >:D");
        } else {
          alert("Perdí? :O");
        }
      } else {
        alert("Empate :)")
      }
      return true;
    }
    return false;
  }
}
