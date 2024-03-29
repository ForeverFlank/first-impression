'use strict';

let clickable = true;

function numberEffect(e, str) {
    if (e == null) return;
    let text = document.createElement('p');
    text.textContent = '+' + str;              

    text.style.pointerEvents = 'none';
    text.style.zIndex = '20';
    text.style.fontSize = '1.2em';
    text.style.color = 'white';
    text.style.mixBlendMode = 'difference';
    text.style.position = 'fixed';
    text.style.left = e.clientX + 'px';
    text.style.top = e.clientY + 'px';

    setTimeout(function() {
        // ripple.remove();
        text.remove();
    }, 500);

    e.currentTarget.appendChild(text);

    text.animate(
        [
            { transform: 'translateY(-20px)', opacity: '1' },
            { transform: 'translateY(-50px)', opacity: '0.6' }
        ],
        { duration: 500, iterations: 1 });
}

function imClick(e) {
    if (clickable) {
        clickable = false;
        setTimeout(() => { clickable = true; }, (clickCooldown()));
        let amount = (imLevels[0].total).mul(imLevels[0].multiplier);
        im = im.add(amount);
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
        // numberEffect(e, format(amount));
    }
}

function imAutoclick() {
    im = im.add((imLevels[0].total).mul(imLevels[0].multiplier).div(tickrate).mul(gameSpeed));
    setText('imAmount', format(im, 'blue'));
}

function imBuy(x) {
    let n = x - 1;
    if (tutorial == 0) {
        tutorial = 1; 
        addAchievements('im01');
        fadeIn('imBuyMax');
        document.getElementById('im1Button').style.animation = 'none';
        // fadeIn('imClickButton');
        // document.getElementById('imClickButton').style.animation = 'highlight 1s linear infinite';
    }
    if (x == 2) {
        addAchievements('im02');
    }
    if (im.cmp(imLevels[n].cost()) >= 0) {
        im = im.sub(imLevels[n].cost());
        imLevels[n].amount = imLevels[n].amount.add(1);
        imLevels[n].total = imLevels[n].total.add(1);
        imCalculateMultiplier();
        setText(`im${n+1}Button`, format(imLevels[n].cost(), 'white'));
    }
}

function imBuyMax(n) {
    const init = imLevelsInitCost[n];
    const step = imLevelsCostStep[n];

    let maxPurchasable = im.mul(step.sub(1)).div(init);
    maxPurchasable = maxPurchasable.add(step.pow(imLevels[n].amount));
    maxPurchasable = maxPurchasable.log(step).floor();
    let maxAmount = Math.round(maxPurchasable.sub(imLevels[n].amount).mag);
    
    if (maxAmount > 0) {
        if (n + 1 == 2) {
            addAchievements('im02');
        }
    }

    let totalCost = new Decimal(0);
    
    const MAX_TERM = 50;
    if (maxAmount < MAX_TERM) {
        for (let i = 0; i < maxAmount; i++) {
            let currentAmount = imLevels[n].amount.add(i);
            totalCost = totalCost.add(init.mul(step.pow(currentAmount)));
        }
    }
    else {
        for (let i = 0; i < MAX_TERM; i++) {
            let currentAmount = imLevels[n].amount.add(maxAmount).sub(i).sub(1);
            totalCost = totalCost.add(init.mul(step.pow(currentAmount)));
            // console.log(totalCost);
        }
    }

    // console.log(maxAmount);
    // console.log(totalCost);
    imLevels[n].amount = imLevels[n].amount.add(maxAmount);
    imLevels[n].total = imLevels[n].total.add(maxAmount);
    imCalculateMultiplier();
    // console.log(n, imLevels[n].amount);
    im = im.sub(totalCost);
    setText(`im${n+1}Button`, format(imLevels[n].cost(), 'white'));
}

function imBuyMaxAll() {
    for (let i = imUnlocked - 1; i >= 0; i--) {
        imBuyMax(i);
    }
}