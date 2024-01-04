'use strict';

function uiUpdate() {
    setInterval(function() {
        setText('imAmount', format(im, 'blue'));
        setText('imRate', format(imLevels[0].value(), 'dark-blue'));
        setText('imPrestigeValue', format(imPrestigeAmount(), 'white', 2));
        setText('imPrestigeCost', format(imPrestigeNextCost(), 'gray'));
        // setText('imAcSpeed', format(autoclickTotal, 'gray'));
        for (var i = 10; i >= 1; i--) {
            setText(`im${i}Mult`, format(imLevels[i - 1].multiplier, 'gray'));
            setText(`im${i}Total`, `${format(imLevels[i - 1].total, 'gray')}&ensp;(${format(imLevels[i - 1].amount, 'gray', 0)})`);
            let button = document.getElementById(`im${i}Button`);
            button.disabled = (im.cmp(imLevels[i - 1].cost()) < 0);
        }
        document.getElementById('imPrestigeButton').disabled = (imMaxIm.cmp(imPrestigeMinimum) < 0);
        setText('mp-imUpgrade3-Level', memoryUpgrades['imUpgrade3'] ? 'ขณะนี้: ×' + format(memoryMaxIm.log10(), 'gray') : 'ยังไม่ปลดล็อก');
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
    let imUnlockedUpdate = false;
    if (imUnlocked == 1 && im.cmp(30) >= 0) {
        imUnlocked = 2;
        fadeIn('im2', 2000, 'flex');
        // imUnlockedUpdate = true;
    }
    if (imUnlocked == 2 && im.cmp(3000) >= 0) {
        imUnlocked = 3;
        fadeIn('im3', 2000, 'flex');
    }
    if (imUnlocked == 3 && im.cmp(3e5) >= 0) {
        imUnlocked = 4;
        fadeIn('im4', 2000, 'flex');
    }
    if (imUnlocked == 4 && im.cmp(3e8) >= 0) {
        imUnlocked = 5;
        fadeIn('im5', 2000, 'flex');
    }
    if (imUnlockedUpdate) {
        for (var i = 10; i > imUnlocked; i--) {
            document.getElementById(`im${i}`).style.display = 'none';
        }
        for (var i = imUnlocked; i > 0; i--) {
            document.getElementById(`im${i}`).style.display = 'flex';
        }
    }
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
    if (memoryUpgrades['imAb'] && imAutobuyActivated) {
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
        if (im.cmp(1e10) >= 0)
            addAchievements('ia04');
    }, 100);
}

// game loop

uiUpdate();
slowUpdate();

setInterval(function() {
    gameUpdate();
}, 1000 / tickrate);