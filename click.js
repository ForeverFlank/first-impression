function imClick() {
    im = im.add((imLevels[0].total).mul(imLevels[0].multiplier));
    if (tutorial == 1) {
        document.getElementById('imClickButton').style.animation = 'none';

    }
    if (tutorial == 1 && im.cmp(imPrestigeMinimum) >= 0) {
        tutorial = 2;
        document.getElementById('imPrestigeButton').style.animation = 'highlight 1s linear infinite';
    }
    setText('imAmount', format(im, 'blue'));
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
        document.getElementById('im1Button').style.animation = 'none';
        document.getElementById('imClickButton').style.animation = 'highlight 1s linear infinite';
    }
    if (im.cmp(imLevels[n - 1].cost()) >= 0) {
        im = im.sub(imLevels[n - 1].cost());
        imLevels[n - 1].amount = imLevels[n - 1].amount.add(1);
        imLevels[n - 1].total = imLevels[n - 1].total.add(1);
    }
}