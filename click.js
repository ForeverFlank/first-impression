'use strict';

let clickable = true;
let clickFinishTime = 0;
let clickableThresholdTime = 60;

function imClick(forced=false) {
    let timeRemaining = clickFinishTime - Date.now();
    // console.log(clickFinishTime % 100000, Date.now() % 100000, timeRemaining)
    if (timeRemaining < 0 || forced) {
        clickFinishTime = Date.now() + clickCooldown;
        im = im.add((imLevels[0].total).mul(imLevels[0].multiplier));
        document.getElementById('clickSlider').animate(
            [
                { width: '0%' },
                { width: '100%'}
            ],
            { duration: clickCooldown, iterations: 1 });
        setText('imAmount', format(im, 'blue'));

        if (tutorial == 1) {
            document.getElementById('imClickButton').style.animation = 'none';
        }
        if (tutorial == 1 && im.cmp(imPrestigeMinimum) >= 0) {
            tutorial = 2;
            document.getElementById('imPrestigeButton').style.animation = 'highlight 1s linear infinite';
        }
    }
    else if (timeRemaining < clickableThresholdTime) {
        setTimeout(() => { imClick(true); }, timeRemaining);
    }
}

function imAutoclick() {
    let autoclick = imAutoclickerAmount.mul(imAutoclickerPerClick)
    im = im.add((imLevels[0].total).mul(imLevels[0].multiplier).mul(autoclick).div(tickrate));
    setText('imAmount', format(im, 'blue'));
}

function imBuy(n) {
    if (tutorial == 0) {
        tutorial = 1; 
        addAchievements('im01');
        fadeIn('imClickButton');
        fadeIn('imBuyMax');
        document.getElementById('im1Button').style.animation = 'none';
        document.getElementById('imClickButton').style.animation = 'highlight 1s linear infinite';
    }
    if (im.cmp(imLevels[n - 1].cost()) >= 0) {
        im = im.sub(imLevels[n - 1].cost());
        imLevels[n - 1].amount = imLevels[n - 1].amount.add(1);
        imLevels[n - 1].total = imLevels[n - 1].total.add(1);
        setText(`im${n}Button`, format(imLevels[n - 1].cost()), 'gray');
    }
}