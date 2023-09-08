function loadDecimal(obj) {
	let x = new Decimal(0);
	x.sign = obj.sign;
	x.mag = obj.mag;
	x.layer = obj.layer;
	return x;
}

//localStorage.removeItem('save');

var savegame = JSON.parse(localStorage.getItem('save'));
console.log(savegame);
if (savegame !== null) {
    if (savegame.tutorial !== null) {
        tutorial = savegame.tutorial;
    }
    if (savegame.im !== null) {
        im = new Decimal(savegame.im);
    }
    imAutoclickerAmount = new Decimal(savegame.imAutoclickerAmount);
    imAutoclickerPerClick = new Decimal(savegame.imAutoclickerPerClick);
    imUnlocked = savegame.imUnlocked;
    // imLevels = savegame.imLevels;
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
    mpMax: mpMax,
    mpMultiplier: mpMultiplier,
    memoryLevel: memoryLevel,
    totalMemoryLevel: totalMemoryLevel
};
*/

// ui inits
if (tutorial == 0) {
  	document.getElementById('im1Button').style.animation = 'highlight 1s linear infinite';
}
memoryInit();