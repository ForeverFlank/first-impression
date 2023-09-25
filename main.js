'use strict';

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
function fadeIn(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).animate(
        [
            { opacity: '0' },
            { opacity: '1' }
        ],
        { duration: 2000, iterations: 1 });
}

let zero = new Decimal(0);
var tickrate = 20;

var tutorial = 0;

var clickCooldown = 1000;

var imInitAmount = new Decimal('10');
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
var imLevelsCostStep = [new Decimal('1.33'), new Decimal('4.00'),
                        new Decimal('8.00'), new Decimal('16.0'),
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
        return init.mul(step.pow(new Decimal(this.amount)));
    }
    value() {
        return this.total.mul(this.multiplier);
    }
    generate() {
        const destination = imLevels[this.level - 2];
        const amount = this.value();
        destination.total = destination.total.add(amount.div(tickrate));
    }
}
var imPrestigeMinimum = new Decimal(100);

var mp = new Decimal('0');
var mpMultiplier = new Decimal(1);
var memoryLevel = [[zero, zero, 0], [zero, zero], [0, false]];
var totalMemoryLevel = new Decimal(0);

var fps = 30;

var achievements = [];
let achievementsQueue = [];
function addAchievements(ac) {
    if (!achievements.includes(ac)) {
        achievements.push(ac);
        achievementsQueue.push(ac);
        setText('acTitle', achievementString[ac][0]);
        setText('acDesc', achievementString[ac][1]);
        document.getElementById('achievement').style.animation = 'achievement-popup 5s';
        setTimeout(() => { document.getElementById('achievement').style.animation = 'none' }, 5000);
    }
}
// addAchievements('ia03');

function imInit() {
    im = imInitAmount;
    imLevels[0].amount = new Decimal(0);
    imLevels[0].total = new Decimal(0);
    for (let i = 1; i <= 10; i++) {
        if (i > 1) {
            imLevels[i - 1].amount = new Decimal(0);
            imLevels[i - 1].total = new Decimal(0);
            imLevels[i - 1].multiplier = new Decimal(1);
        }
        setText(`im${i}Mult`, format(imLevels[i - 1].multiplier, 'gray'));
        setText(`im${i}Total`, format(imLevels[i - 1].total, 'gray'));
        let button = document.getElementById(`im${i}Button`);
        button.disabled = (im.cmp(imLevels[i - 1].cost()) < 0);
    }
}

var save;