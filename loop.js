'use strict';

function uiUpdate() {
    setInterval(function() {
        let autoclickTotal = imAutoclickerAmount.mul(imAutoclickerPerClick);
        setText('imAmount', format(im, 'blue'));
        setText('imRate', format(imLevels[0].value().mul(autoclickTotal), 'dark-blue'));
        setText('imPrestigeValue', format(imPrestigeAmount(), 'white', 2));
        setText('imPrestigeCost', format(imPrestigeNextCost(), 'gray'));
        setText('imAcAmount', format(imAutoclickerAmount, 'gray', 0));
        setText('imAcPc', format(imAutoclickerPerClick));
        for (var i = 10; i >= 1; i--) {
            setText(`im${i}Mult`, format(imLevels[i - 1].multiplier, 'gray'));
            setText(`im${i}Total`, format(imLevels[i - 1].total, 'gray'));
            let button = document.getElementById(`im${i}Button`);
            button.disabled = (im.cmp(imLevels[i - 1].cost()) < 0);
        }
        document.getElementById('imPrestigeButton').disabled = (im.cmp(imPrestigeMinimum) < 0);

        // mp slider
        let cost = imPrestigeCost();
        let nextCost = imPrestigeNextCost();
        let ratio = (im.sub(cost)).div(nextCost.sub(cost)).mul(100);
        setSlider('nextImBar', ratio.mag);
        
        setText('mpAmount', format(mp, 'purple'));
    }, 1000 / fps);
}

function gameUpdate() {
    // 1 tick = 50 ms -> 20 tick / s
    setInterval(function() {
        for (var i = 10; i > 1; i--) {
            imLevels[i - 1].generate();
        }
        imAutoclick();
    }, 1000 / tickrate);
}

function slowUpdate() {
    // for less necessary update such as achievements
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
gameUpdate();
slowUpdate();