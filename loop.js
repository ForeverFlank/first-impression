'use strict';

function uiUpdate() {
    setInterval(function() {
        let autoclickTotal = autoClickerAmount().mul(autoClickerPerClick()).mul(autoClickerSpeed());
        setText('imAmount', format(im, 'blue'));
        setText('imRate', format(imLevels[0].value().mul(autoclickTotal), 'dark-blue'));
        setText('imPrestigeValue', format(imPrestigeAmount(), 'white', 2));
        setText('imPrestigeCost', format(imPrestigeNextCost(), 'gray'));
        setText('imAcSpeed', format(autoclickTotal, 'gray'));
        for (var i = 10; i >= 1; i--) {
            setText(`im${i}Mult`, format(imLevels[i - 1].multiplier, 'gray'));
            setText(`im${i}Total`, format(imLevels[i - 1].total, 'gray'));
            let button = document.getElementById(`im${i}Button`);
            button.disabled = (im.cmp(imLevels[i - 1].cost()) < 0);
        }
        document.getElementById('imPrestigeButton').disabled = (imMaxIm.cmp(imPrestigeMinimum) < 0);
        setText('mp23Level', format(autoClickerSpeed(), 'gray', 1));
        let ratio = im.div(imPrestigeNextCost()).mul(100);
        setSlider('nextImBar', ratio.mag);
        setText('mpAmount', format(mp, 'purple'));
        setText('fpAmount', format(fp, 'pink'));

        imAutoPrestigeThreshold = new Decimal(document.getElementById('imAutoPrestigeThreshold').value);
    }, 1000 / fps);
}


function gameUpdate() {
    // 1 tick = 50 ms -> 20 tick / s
    // gamespeed = new Decimal(1).div(mp.add(1));
    for (var i = 10; i > 1; i--) {
        imLevels[i - 1].generate();
    }
    imAutoclick();
    if (im.cmp(imMaxIm) > 0) {
        imMaxIm = im;
    }
    if (im.cmp(memoryMaxIm) > 0) {
        memoryMaxIm = im;
    }
    if (memoryLevel[3][0] && imAutobuyActivated) {
        imBuyMaxAll();
    }
    imAutoPrestige();
}

function slowUpdate() {
    // 10 updates per sec (100ms interval)
    setInterval(function() {
        if (im.cmp(100) >= 0)
            addAchievements('ia01');
        if (im.cmp(1000) >= 0)
            addAchievements('ia02');
        if (im.cmp(1000000) >= 0)
            addAchievements('ia03');
    }, 100);
}

// game loop

uiUpdate();
slowUpdate();

setInterval(function() {
    gameUpdate();
}, 1000 / tickrate);