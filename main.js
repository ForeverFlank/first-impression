'use strict';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}
function setSlider(id, value, duration = 1000) {
    let bar = document.getElementById(id);
    bar.animate(
        [{ width: `${value}%` }],
        { duration: duration }
    );
}
function fadeIn(id, duration = 2000, display = 'block') {
    document.getElementById(id).style.display = display;
    document.getElementById(id).animate(
        [
            { opacity: '0' },
            { opacity: '1' }
        ],
        { duration: duration, iterations: 1 });
}
function fadeOut(id, duration = 2000) {
    document.getElementById(id).animate(
        [
            { opacity: '1' },
            { opacity: '0' }
        ],
        { duration: duration, iterations: 1 });
    setTimeout(function () {
        document.getElementById(id).style.display = 'none'
    }, duration);
}

var DEBUG = false;

const zero = new Decimal(0);
const tickrate = 20;
var gameSpeed = new Decimal(1);
var ordinal = ['First', 'Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];

var tutorial = 0;

var memoryUpgrades = {
    'im1Mult': zero,
    'imMult': zero,
    'mpMult': zero,
    'imUpgrade1': false,
    'imUpgrade2': false,
    'imUpgrade3': false,
    'imAb': false,
    'mpAb': false,
    'permUpgrade1': false
}

var imInitAmount = () => {
    if (memoryUpgrades['permUpgrade1'])
        return new Decimal(50);
    return new Decimal(10);
}
var im = new Decimal(10);

var imUnlocked = 1;
var imLevels = [];

// --- constant
var imLevelsInitCost = [
    new Decimal('10'), new Decimal('100'),
    new Decimal('10000'), new Decimal('e8'),
    new Decimal('e16'), new Decimal('e32'),
    new Decimal('e64'), new Decimal('e128'),
    new Decimal('e256'), new Decimal('e512')];
var imLevelsCostStep = [
    new Decimal('1.5'), new Decimal('3'),
    new Decimal('6'), new Decimal('12'),
    new Decimal('80'), new Decimal('3200'),
    new Decimal('e6'), new Decimal('e12'),
    new Decimal('e24'), new Decimal('e48')];
var imLevelsInitMult = [
    new Decimal(1), new Decimal(1 / 2),
    new Decimal(1 / 4), new Decimal(1 / 8),
    new Decimal(1 / 16), new Decimal(1 / 32),
    new Decimal(1 / 64), new Decimal(1 / 128),
    new Decimal(1 / 256), new Decimal(1 / 512)];

// --- ims

class ImLevel {
    constructor(level, amount, total, multiplier) {
        this.level = level;
        this.amount = amount;
        this.total = total;
        this.multiplier = multiplier;
    }
    cost() {
        const init = imLevelsInitCost[this.level - 1];
        const step = imLevelsCostStep[this.level - 1];
        return init.mul(step.pow(this.amount));
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
var imPrestigeMinimum = new Decimal('1000');
var imAutobuyActivated = false;
var imAutoPrestigeActivated = false;
let imAutoPrestigeThreshold = new Decimal(0);
var imMaxIm = imInitAmount();

// --- mps

var mp = new Decimal('0');
var totalmemoryUpgrades = new Decimal(0);
var memoryMaxIm = imInitAmount();
var mpMultiplier = () => new Decimal(2).pow(memoryUpgrades['mpMult']);

// --- fps

var fp = new Decimal('0');

// -- misc

var fps = 30;

var achievements = [];
let achievementsQueue = [];
function addAchievements(ac) {
    if (!achievements.includes(ac)) {
        achievements.push(ac);
        achievementsQueue.push(ac);
        setText('acTitle', achievementStrings[ac][0]);
        setText('acDesc', achievementStrings[ac][1]);
        document.getElementById('achievement').style.animation = 'achievement-popup 5s';
        setTimeout(() => { document.getElementById('achievement').style.animation = 'none' }, 5000);
    }
}
// addAchievements('ia03');

function imCalculateMultiplier() {
    for (let i = 0; i < 10; i++) {
        let im1Mult = (i == 0) ? new Decimal(2).pow(memoryUpgrades['im1Mult']) : new Decimal(1);
        let imMult = new Decimal(2).pow(memoryUpgrades['imMult']);
        let imUpgrade1Mult = memoryUpgrades['imUpgrade1'] ? new Decimal(1.05).pow(imLevels[i].amount) : new Decimal(1);
        let imUpgrade2Mult = memoryUpgrades['imUpgrade2'] ? new Decimal(2).pow(imLevels[i].amount.div(10).floor()) : new Decimal(1);
        let imUpgrade3Mult = memoryUpgrades['imUpgrade3'] ? memoryMaxIm.log10() : new Decimal(1);
        let permUpgrade1Mult = memoryUpgrades['permUpgrade1'] ? new Decimal(2) : new Decimal(1);
        imLevels[i].multiplier = imLevelsInitMult[i]
            .mul(im1Mult)
            .mul(imMult)
            .mul(imUpgrade1Mult)
            .mul(imUpgrade2Mult)
            .mul(imUpgrade3Mult)
            .mul(permUpgrade1Mult);
    }
}

function imReset() {
    im = imInitAmount();
    imMaxIm = im;
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
        setText(`im${i + 1}Button`, format(imLevels[i].cost(), 'white'));
        setText(`im${i + 1}Mult`, format(imLevels[i].multiplier, 'gray'));
        setText(`im${i + 1}Total`, format(imLevels[i].total, 'gray'));
        let button = document.getElementById(`im${i + 1}Button`);
        button.disabled = (im.cmp(imLevels[i].cost()) < 0);
    }
    imCalculateMultiplier();
}

function imAbToggle(element) {
    imAutobuyActivated = element.checked;
}

function imAutoPrestigeToggle(element) {
    imAutoPrestigeActivated = element.checked;
}

var save;