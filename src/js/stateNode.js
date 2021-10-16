const NODE_ENUMS = {
  MIN: "O",
  MAX: "X",
  FINAl: null,
};
class StateNode {
  constructor(parent, state, type) {
    this.parent = parent;
    this.state = state;
    this.type = type;
    this.value = undefined;
    this.childrens = [];
    this.createChildNodes();
  }
  createChildNodes() {
    this.state.forEach((stateValue, indexStateValue) => {
      if (stateValue === null) {
        const childType = this.calcChildType();
        const newState = Object.assign([], this.state);
        newState[indexStateValue] = this.type;
        this.childrens.push(new StateNode(this, newState, childType));
      }
    });
  }
  calcChildType() {
    return this.type === NODE_ENUMS.MAX ? NODE_ENUMS.MIN : NODE_ENUMS.MAX;
  }
}
