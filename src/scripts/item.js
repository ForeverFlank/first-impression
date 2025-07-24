export class Item {
    constructor(value, costFunction) {
        this.value = value;
        this.costFunction = costFunction;
    }
    setArg(arg) {
        this.arg = arg
    }
    getCost() {
        return this.costFunction(this.value, this.arg);
    }
}