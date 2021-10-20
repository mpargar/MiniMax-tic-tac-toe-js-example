const NODE_ENUMS = {
    MIN: "O",
    MAX: "X",
    FINAl: null,
};
const WIN_CONDITIONS_INDEXS = [
    //Horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
];

class StateNode {
    constructor(parent, state, type, lastPlay) {
        this.parent = parent;
        this.state = state;
        this.type = type;
        this.parentValueSense = this.type === NODE_ENUMS.MAX ? -1 : 1;
        this.value = undefined;
        this.childrens = [];
        this.lastPlay = lastPlay;
        this.createChildNodes();
    }

    createChildNodes() {
        this.calcIfNodeIsFinal();
        if (this.type !== NODE_ENUMS.FINAl) {
            this.state.forEach((stateValue, indexStateValue) => {
                if (stateValue === null) {
                    const childType = this.calcChildType();
                    const newState = Object.assign([], this.state);
                    newState[indexStateValue] = this.type;
                    this.childrens.push(new StateNode(this, newState, childType, indexStateValue));
                    this.calcValueFromChilds();
                }
            });
        }
    }

    calcChildType() {
        return this.type === NODE_ENUMS.MAX ? NODE_ENUMS.MIN : NODE_ENUMS.MAX;
    }

    calcIfNodeIsFinal() {
        const won = WIN_CONDITIONS_INDEXS.some(wciArray => {
            const char = this.state[wciArray[0]];
            return wciArray.every(wcaItem => !!char && this.state[wcaItem] === char);
        });
        const emptySpacesCount = this.state.reduce((currentValue, stateValue) =>
            !stateValue ? currentValue + this.parentValueSense : currentValue, 0);
        if (won) {
            this.value = emptySpacesCount + this.parentValueSense;
            /*this.value = this.valueSense;*/
            this.type = NODE_ENUMS.FINAl;
            this.childrens = undefined;
        } else {
            if (emptySpacesCount === 0) {
                this.value = 0;
                this.type = NODE_ENUMS.FINAl;
                this.childrens = undefined;
            }
        }
    }

    calcValueFromChilds() {
        const childValues = this.childrens.map(child => child.value);
        if (this.type === NODE_ENUMS.MAX) {
            this.value = Math.max(...childValues);
        } else if (this.type === NODE_ENUMS.MIN) {
            this.value = Math.min(...childValues);
        }
        if (Number.isNaN(this.value)) {
            console.log(childValues, this.childrens);
        }
    }

    getNextBestState() {
        if (this.type === NODE_ENUMS.MAX) {
            return this.childrens.reduce((lastBestChild, childrenToEval) =>
                lastBestChild.value > childrenToEval.value ? lastBestChild : childrenToEval)
        } else if (this.type === NODE_ENUMS.MIN) {
            return this.childrens.reduce((lastBestChild, childrenToEval) =>
                lastBestChild.value < childrenToEval.value ? lastBestChild : childrenToEval)
        }
    }
}
