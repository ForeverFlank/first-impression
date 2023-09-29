'use strict';

function autosave() {
    setInterval(function() {
        save = {
            tutorial: tutorial,
            clickCooldown: clickCooldown,
            imInitAmount: imInitAmount,
            im: im,
            imAutoclickerAmount: imAutoclickerAmount,
            imAutoclickerPerClick: imAutoclickerPerClick,
            imUnlocked: imUnlocked,
            imLevels: imLevels,
            imPrestigeMinimum: imPrestigeMinimum,
            mp: mp,
            mpMultiplier: mpMultiplier,
            memoryLevel: memoryLevel,
            totalMemoryLevel: totalMemoryLevel,
            achievements: achievements
        };
        localStorage.setItem('save', JSON.stringify(save));
    }, 10 * 1000);
}
autosave();

function loadDecimal(obj) {
	let x = new Decimal(0);
	x.sign = obj.sign;
	x.mag = obj.mag;
	x.layer = obj.layer;
	return x;
}

function loadImLevels(obj) {
    let x = [];
    for(let i = 0; i < 10; i++) {
        x.push(new ImLevel(i+1,
            new Decimal(obj[i]['amount']),
            new Decimal(obj[i]['total']),
            new Decimal(obj[i]['multiplier']),
            obj[i]['abUnlocked'],
            obj[i]['abEnabled']));
    }
    return x;
}

function loadMpLevels(obj) {
    let x = [];
    x.push([new Decimal(obj[0][0]), new Decimal(obj[0][1]), obj[0][2]]);
    x.push([new Decimal(obj[1][0]), new Decimal(obj[1][1])]);
    x.push([new Decimal(obj[2][0]), new Decimal(obj[2][1])]);
    x.push([obj[3][0], obj[3][1]]);
    return x;
}

var sg = JSON.parse(localStorage.getItem('save'));
console.log(sg);
if (sg !== null) {
    if (sg.tutorial !== null)
        tutorial = sg.tutorial;
    if (sg.clickCooldown !== null)
        clickCooldown = sg.clickCooldown;
    if (sg.imInitAmount !== null)
        imInitAmount = new Decimal(sg.imInitAmount);
    if (sg.im !== null)
        im = new Decimal(sg.im);
    if (sg.imAutoclickerAmount !== null)
        imAutoclickerAmount = new Decimal(sg.imAutoclickerAmount);
    if (sg.imAutoclickerPerClick !== null)
        imAutoclickerPerClick = new Decimal(sg.imAutoclickerPerClick);
    if (sg.imUnlocked !== null)
        imUnlocked = sg.imUnlocked;
    if (sg.imLevels !== null)
        imLevels = loadImLevels(sg.imLevels);
    if (sg.imPrestigeMinimum !== null)
        imPrestigeMinimum = new Decimal(sg.imPrestigeMinimum);

    if (sg.mp !== null)
        mp = new Decimal(sg.mp);
    if (sg.mpMultiplier !== null)
        mpMultiplier = new Decimal(sg.mpMultiplier);
    if (sg.memoryLevel !== null)
        memoryLevel = loadMpLevels(sg.memoryLevel);
    if (sg.totalMemoryLevel !== null)
        totalMemoryLevel = new Decimal(sg.totalMemoryLevel);
    if (sg.achievements !== null)
        achievements = sg.achievements;
}

for (var i = 10; i > imUnlocked; i--) {
    document.getElementById(`im${i}`).style.display = 'none';
}
for (var i = 1; i <= 10; i++) {
    setText(`im${i}Button`, format(imLevels[i - 1].cost()));
    setText(`im${i}Mult`, format(imLevels[i - 1].multiplier), 'gray');
    setText(`im${i}Total`, format(imLevels[i - 1].total), 'gray');
}
/*
var save = {
    tutorial: tutorial,
    im: im,
    imAutoclickerAmount: imAutoclickerAmount,
    imAutoclickerPerClick: imAutoclickerPerClick,
    imUnlocked: imUnlocked,
    imLevels: imLevels,
    imPrestigeMinimum: imPrestigeMinimum,
    mp: mp,
    mpMultiplier: mpMultiplier,
    memoryLevel: memoryLevel,
    totalMemoryLevel: totalMemoryLevel
};
*/

// ui inits
if (tutorial == 0) {
  	document.getElementById('im1Button').style.animation = 'highlight 1s linear infinite';
    document.getElementById('imClickButton').style.display = 'none';
    document.getElementById('imBuyMax').style.display = 'none';
}

memoryInit();

function importSave() {
    let s = prompt('Input your save');
    save = s;
    localStorage.setItem('save', save);
}

function exportSave() {
    prompt('Copy your save here', JSON.stringify(save));
}

function deleteSave() {
    localStorage.removeItem('save')
}