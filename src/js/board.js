class Board {
  constructor() {
    this.container = document.getElementById("app");
    this.buttons = [null, null, null, null, null, null, null, null, null].map(
      (btnValue) => {
        const btn = document.createElement("button");
        btn.innerHTML = btnValue;
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
