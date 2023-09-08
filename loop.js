function uiUpdate() {
    setInterval(function() {
        let autoclickTotal = imAutoclickerAmount.mul(imAutoclickerPerClick);
        setText('imAmount', format(im, 'blue'));
        setText('imRate', format(imLevels[0].value().mul(autoclickTotal), 'dark-blue'));
        setText('imPrestigeValue', format(imPrestigeAmount(), 'white', 2));
        setText('mpAmount', format(mp, 'purple'));
        setText('mpMaxAmount', format(mpMax, 'purple'));
        setText('imPrestigeCost', format(imPrestigeNextCost(), 'gray'));
        for (var i = 10; i >= 1; i--) {
            setText(`im${i}Button`, format(imLevels[i - 1].cost()), 'gray');
            setText(`im${i}Mult`, format(imLevels[i - 1].multiplier), 'gray');
            setText(`im${i}Total`, format(imLevels[i - 1].total), 'gray');
            let button = document.getElementById(`im${i}Button`);
            button.disabled = (im.cmp(imLevels[i - 1].cost()) < 0);
        }
        document.getElementById('imPrestigeButton').disabled = (im.cmp(imPrestigeMinimum) < 0);

        // mp slider
        let cost = imPrestigeCost();
        let nextCost = imPrestigeNextCost();
        let ratio = (im.sub(cost)).div(nextCost.sub(cost)).mul(100);
        setSlider('nextImBar', ratio.mag);
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

function autosave() {
    setInterval(function() {
        localStorage.setItem('save', JSON.stringify(save));
    }, 10 * 1000);
}

// game loop

uiUpdate();
gameUpdate();
autosave();