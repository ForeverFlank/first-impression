function setText(id, str) {
    document.getElementById(id).firstChild.data = str;
}

var tutorial = 0;
var tickrate = 20;

var im = new Decimal(0);
var imPerClick = new Decimal(1);
var imUnlocked = 5;
var im1Multiplier = new Decimal(1);
var imLevels = [];
var imLevelsInitCost = [new Decimal(    0), new Decimal( 'e6'),
                        new Decimal( 'e8'), new Decimal('e10'),
                        new Decimal('e12'), new Decimal('e16'),
                        new Decimal('e20'), new Decimal('e30'),
                        new Decimal('e40'), new Decimal('e50')];
var imLevelsCostStep = [new Decimal(    0), new Decimal( 'e2'),
                        new Decimal( 'e4'), new Decimal( 'e6'),
                        new Decimal( 'e8'), new Decimal('e10'),
                        new Decimal('e12'), new Decimal('e15'),
                        new Decimal('e20'), new Decimal('e25')];
class ImLevel {
    constructor(level, amount, total, multiplier, abUnlocked, abEnabled) {
        this.level = level;
        this.amount = amount;
        this.total = total;
        this.multiplier = multiplier;
        this.abUnlocked = abUnlocked;
        this.abEnabled = abEnabled;
    }
    cost() {
        const init = imLevelsInitCost[i - 1];
        const step = imLevelsCostStep[i - 1];
        return init.mul(step.pow(new Decimal(this.level).div(10).floor()));
    }
    generate() {
        const dest = imLevels[this.level - 2];
        const amount = this.total.mul(this.multiplier);
        dest.total = dest.total.add(amount.div(tickrate));
    }
}

var mp = new Decimal(0);