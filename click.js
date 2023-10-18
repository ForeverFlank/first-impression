'use strict';

let clickable = true;

function imClick() {
    if (clickable) {
        clickable = false;
        setTimeout(() => { clickable = true; }, (clickCooldown()));
        im = im.add((imLevels[0].total).mul(imLevels[0].multiplier));
        document.getElementById('clickSlider').animate(
            [
                { width: '0%' },
                { width: '100%'}
            ],
            { duration: clickCooldown(), iterations: 1 });
        setText('imAmount', format(im, 'blue'));

        if (tutorial == 1) {
            document.getElementById('imClickButton').style.animation = 'none';
        }
        if (tutorial == 1 && im.cmp(imPrestigeMinimum) >= 0) {
            tutorial = 2;
            document.getElementById('imPrestigeButton').style.animation = 'highlight 1s linear infinite';
        }
    }
}

function imAutoclick() {
    let autoClick = autoClickerAmount().mul(autoClickerPerClick())
    im = im.add((imLevels[0].total).mul(imLevels[0].multiplier).mul(autoClick).div(tickrate).mul(gameSpeed));
    setText('imAmount', format(im, 'blue'));
}

function imBuy(x) {
    let n = x - 1;
    if (tutorial == 0) {
        tutorial = 1; 
        addAchievements('im01');
        fadeIn('imClickButton');
        fadeIn('imBuyMax');
        document.getElementById('im1Button').style.animation = 'none';
        document.getElementById('imClickButton').style.animation = 'highlight 1s linear infinite';
    }
    if (im.cmp(imLevels[n].cost()) >= 0) {
        im = im.sub(imLevels[n].cost());
        imLevels[n].amount = imLevels[n].amount.add(1);
        imLevels[n].total = imLevels[n].total.add(1);
        imCalculateMultiplier();
        setText(`im${n+1}Button`, format(imLevels[n].cost()), 'gray');
    }
}