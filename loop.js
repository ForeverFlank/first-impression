var fps = 5;

// ui loop
function uiUpdate() {
    setInterval(function() {
        setText('imAmount', im);
        setText('imPrestigeCost', imPrestigeNextCost());
        setText('imPrestigeButton', imPrestigeAmount());
        setText('mpAmount', mp);
    }, 1000 / fps);
}

function gameUpdate() {
    // 1 tick = 50 ms -> 20 tick / s
    setInterval(function() {
        for (var i = 10; i >= 1; i--) {
            setText(`im${i}Mult`, imLevels[i - 1].multiplier);
            setText(`im${i}Total`, imLevels[i - 1].total);
            if (i != 1) imLevels[i - 1].generate();
        }
    }, 1000 / tickrate);
}

// game loop

uiUpdate();
gameUpdate();