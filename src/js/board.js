class Board {
  constructor() {
    this.container = document.getElementById("app");
    this.buttons = [null, null, null, null, null, null, null, null, null].map(
      () => {
        const btn = document.createElement("button");
        return btn;
      }
    );
  }
  initButtons() {
    this.buttons.forEach((button) => {
      this.container.appendChild(button);
    });
  }
}
