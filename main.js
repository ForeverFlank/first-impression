'use strict';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}
function setSlider(id, value, time = 1000) {
    let bar = document.getElementById(id);
    bar.animate(
        [{ width: `${value}%` }],
        { duration: time }
    );
}
function fadeIn(id, duration=2000) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).animate(
        [
            { opacity: '0' },
            { opacity: '1' }
        ],
        { duration: duration, iterations: 1 });
}
function fadeOut(id, duration=2000) {
    document.getElementById(id).animate(
        [
            { opacity: '1' },
            { opacity: '0' }
        ],
        { duration: duration, iterations: 1 });
    setTimeout(function() {
        document.getElementById(id).style.display = 'none'
    }, duration);
}

const zero = new Decimal(0);
const tickrate = 20;
var gameSpeed = 1;

var tutorial = 0;

var imInitAmount = new Decimal('10');
var im = imInitAmount;

var imUnlocked = 1;
var imLevels = [];
// !--- constant
var imLevelsInitCost = [new Decimal('e1'), new Decimal('e3'),
new Decimal('e6'), new Decimal('e10'),
new Decimal('e15'), new Decimal('e20'),
new Decimal('e30'), new Decimal('e40'),
new Decimal('e50'), new Decimal('e60')];
var imLevelsCostStep = [new Decimal('1.33'), new Decimal('4.00'),
new Decimal('8.00'), new Decimal('16.0'),
new Decimal('24.0'), new Decimal('48.0'),
new Decimal('100'), new Decimal('1000'),
new Decimal('1e4'), new Decimal('1e5')];
var imLevelsInitMult = [new Decimal(1), new Decimal(1 / 2),
new Decimal(1 / 4), new Decimal(1 / 8),
new Decimal(1 / 16), new Decimal(1 / 32),
new Decimal(1 / 64), new Decimal(1 / 128),
new Decimal(1 / 256), new Decimal(1 / 512)];
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
        destination.total = destination.total.add(amount.div(tickrate).mul(gameSpeed));
    }
}
var imPrestigeMinimum = new Decimal(100);

var mp = new Decimal('0');
var memoryLevel = [[zero, zero, 0], [zero, zero], [false, false, false, false]];
var totalMemoryLevel = new Decimal(0);
var mpMultiplier = () => new Decimal(2).pow(memoryLevel[0][1]);
var autoClickerAmount = () => memoryLevel[1][0];
var autoClickerPerClick = () => new Decimal(0.1).mul(new Decimal(2).pow(memoryLevel[1][1]));
var clickCooldown = () => (1000 - memoryLevel[0][2] * 150) / gameSpeed;

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

function imCalculateMultiplier() {
    for (let i = 0; i < 10; i++) {
        let mp11Multiplier = (i == 0) ? new Decimal(1.2).pow(memoryLevel[0][0]) : new Decimal(1);
        let mp31Multiplier = memoryLevel[2][0] ? new Decimal(1.02).pow(imLevels[i].amount) : new Decimal(1);
        let mp32Multiplier = memoryLevel[2][1] ? new Decimal(2).pow(imLevels[i].amount.div(10).floor()) : new Decimal(1);
        imLevels[i].multiplier = imLevelsInitMult[i].mul(
            mp11Multiplier).mul(
            mp31Multiplier).mul(
            mp32Multiplier);
    }
}

function imReset() {
    im = imInitAmount;
    // imLevels[0].amount = new Decimal(0);
    // imLevels[0].total = new Decimal(0);
    
    for (let i = 0; i < 10; i++) {
        if (i > 1) {
            imLevels[i].amount = new Decimal(0);
            imLevels[i].total = new Decimal(0);
            imLevels[i].multiplier = new Decimal(1);
        }
        imLevels[i].amount = new Decimal(0);
        imLevels[i].total = new Decimal(0);
        setText(`im${i + 1}Button`, format(imLevels[i].cost(), 'gray'));
        setText(`im${i + 1}Mult`, format(imLevels[i].multiplier, 'gray'));
        setText(`im${i + 1}Total`, format(imLevels[i].total, 'gray'));
        let button = document.getElementById(`im${i + 1}Button`);
        button.disabled = (im.cmp(imLevels[i].cost()) < 0);
    }
    imCalculateMultiplier();
}

var save;