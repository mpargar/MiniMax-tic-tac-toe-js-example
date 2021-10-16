const GameBoard = new Board();
GameBoard.initButtons();
const player1 = new Player(GameBoard, NODE_ENUMS.MAX, true);
const player2 = new Agent(GameBoard, NODE_ENUMS.MIN, false);
