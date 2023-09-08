function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}
function setSlider(id, value, time=1000) {
    let bar = document.getElementById(id);
    bar.animate(
        [{ width: `${value}%`}],
        { duration: time }
    );
}

let zero = new Decimal(0);
var tickrate = 20;

var tutorial = 0;

var imInitAmount = new Decimal('20');
var im = imInitAmount;
var imAutoclickerAmount = new Decimal(0);
var imAutoclickerPerClick = new Decimal(0.5);
var imUnlocked = 1;
var imLevels = [];
// !--- constant
var imLevelsInitCost = [new Decimal( 'e1'), new Decimal( 'e3'),
                        new Decimal( 'e6'), new Decimal('e10'),
                        new Decimal('e15'), new Decimal('e20'),
                        new Decimal('e30'), new Decimal('e40'),
                        new Decimal('e50'), new Decimal('e60')];
var imLevelsCostStep = [new Decimal('1.33'), new Decimal('2.67'),
                        new Decimal('6.00'), new Decimal('12.0'),
                        new Decimal('24.0'), new Decimal('48.0'),
                        new Decimal( '100'), new Decimal('1000'),
                        new Decimal( '1e4'), new Decimal( '1e5')];
/// constant ---
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
        const init = imLevelsInitCost[this.level - 1];
        const step = imLevelsCostStep[this.level - 1];
        return init.mul(2).mul(step.pow(new Decimal(this.amount)));
    }
    value() {
        return this.total.mul(this.multiplier);
    }
    generate() {
        const dest = imLevels[this.level - 2];
        const amount = this.value();
        dest.total = dest.total.add(amount.div(tickrate));
    }
}
var imPrestigeMinimum = new Decimal(500);

var mp = new Decimal('0');
var mpMax = new Decimal(100);
var mpMultiplier = new Decimal(1);
var memoryLevel = [[zero, zero], [zero, zero], [0, false]];
var totalMemoryLevel = new Decimal(0);

var fps = 30;

var achievements = [];
function addAchievements(ac) {
    if (!achievements.includes(ac)) {
        achievements.push(ac);
        setText('acTitle', achievementString[ac][0]);
        setText('acDesc', achievementString[ac][1]);
        document.getElementById('achievement').style.animation = 'achievement-popup 5s';
    }
}
// addAchievements('ia03');
var save = {
    tutorial: tutorial,
    imInitAmount: imInitAmount,
    im: im,
    imAutoclickerAmount: imAutoclickerAmount,
    imAutoclickerPerClick: imAutoclickerPerClick,
    imUnlocked: imUnlocked,
    imLevels: imLevels,
    imPrestigeMinimum: imPrestigeMinimum,
    mp: mp,
    mpMax: mpMax,
    mpMultiplier: mpMultiplier,
    memoryLevel: memoryLevel,
    totalMemoryLevel: totalMemoryLevel
};

function imInit() {
    im = imInitAmount;
    imLevels[0].amount = new Decimal(0);
    imLevels[0].total = new Decimal(0);
    for (let i = 2; i <= 10; i++) {
        imLevels[i - 1].amount = new Decimal(0);
        imLevels[i - 1].total = new Decimal(0);
        imLevels[i - 1].multiplier = new Decimal(1);
    }
}