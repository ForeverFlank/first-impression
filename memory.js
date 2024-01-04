'use strict';

function imPrestigeAmount(mult = true) {
    if (imMaxIm.cmp(imPrestigeMinimum) < 0) {
        return new Decimal(0);
    }
    // let result = imMaxIm.div(imPrestigeMinimum).log10().add(1).floor();
    let result = imMaxIm.log(imPrestigeMinimum).floor();

    if (mult) {
        // (1/2)(x)(x+1)
        return result.mul(mpMultiplier());
        // return result.mul(result.add(1)).div(2).mul(mpMultiplier());
    }
    return result;
}

function imPrestigeCost() {
    let result = imPrestigeAmount(false);
    if (imMaxIm.cmp(imPrestigeMinimum) < 0) {
        return new Decimal(0);
    }
    return new Decimal(imPrestigeMinimum).pow(result);
    // return new Decimal(10).pow(result.sub(1)).mul(imPrestigeMinimum);
}

function imPrestigeNextCost() {
    let result = imPrestigeAmount(false);
    return new Decimal(imPrestigeMinimum).pow(result.add(1));
    // return new Decimal(10).pow(result).mul(imPrestigeMinimum);
}

function memoryCost(id) {
    let ml = memoryUpgrades[id];
    if (id == 'imMult')
        return new Decimal(1).mul(new Decimal(3).pow(ml)).floor();
    if (id == 'mpMult')
        return new Decimal(2).mul(new Decimal(3).pow(ml)).floor();
    if (id == 'imUpgrade1')
        return new Decimal(15);
    if (id == 'imUpgrade2')
        return new Decimal(80);
    if (id == 'imUpgrade3')
        return new Decimal(100000);
    if (id == 'imAb')
        return new Decimal(1000);
    if (id == 'mpAb')
        return new Decimal(1e6);
    if (id == 'permUpgrade1')
        return new Decimal(2e4);
};

function memoryCanBuy(id) {
    let cost = () => memoryCost(id);
    if (mp.cmp(cost()) < 0) return false;
    if (id == 'imUpgrade1')
        return !memoryUpgrades['imUpgrade1'];
    if (id == 'imUpgrade2')
        return !memoryUpgrades['imUpgrade2'];
    if (id == 'imUpgrade3')
        return !memoryUpgrades['imUpgrade3'];
    if (id == 'imAb')
        return !memoryUpgrades['imAb'];
    if (id == 'mpAb')
        return !memoryUpgrades['mpAb'];
    if (id == 'permUpgrade1')
        return !memoryUpgrades['permUpgrade1'];
    return true;
}

function memoryDisableButton() {
    for (const [key, value] of Object.entries(memoryUpgrades)) {
        try {
            document.getElementById(`mp-${key}`).disabled = !memoryCanBuy(key);
        } catch(e) {
            console.log(e, key, value)
        }
    }
}

function imPrestigeClick() {
    mp = mp.add(imPrestigeAmount());
    imReset();
    memoryDisableButton();
    let ratio = im.div(imPrestigeNextCost()).mul(100);
    setSlider('nextImBar', ratio.mag, 1);
    if (tutorial == 2) {
        tutorial = 3;
        document.getElementById('imPrestigeButton').style.animation = 'none';
        document.getElementById('buttonMp').style.animation = 'highlight 1s linear infinite';
    }
}

function imAutoPrestige() {
    if (memoryUpgrades['mpAb'] &&
        imAutoPrestigeActivated &&
        imPrestigeAmount().cmp(imAutoPrestigeThreshold) >= 0) {
        imPrestigeClick();
    }
}

function memoryBuy(id) {
    let cost = () => memoryCost(id);
    if (!memoryCanBuy(id)) return;
    mp = mp.sub(cost());
    if (id == 'imMult') {
        memoryUpgrades['imMult'] = memoryUpgrades['imMult'].add(1);
    } else if (id == 'mpMult') {
        memoryUpgrades['mpMult'] = memoryUpgrades['mpMult'].add(1);
    } else if (id == 'imUpgrade1') {
        memoryUpgrades['imUpgrade1'] = true;
    } else if (id == 'imUpgrade2') {
        memoryUpgrades['imUpgrade2'] = true;
    } else if (id == 'imUpgrade3') {
        memoryUpgrades['imUpgrade3'] = true;
    } else if (id == 'imAb') {
        memoryUpgrades['imAb'] = true;
    } else if (id == 'mpAb') {
        memoryUpgrades['mpAb'] = true;
    } else if (id == 'permUpgrade1') {
        memoryUpgrades['permUpgrade1'] = true;
    }
    memoryInit();
    totalmemoryUpgrades = totalmemoryUpgrades.add(1);
    setText(`mp-${id}-Cost`, format(cost()));
}

// init
function memoryInit() {
    setText('mp-imMult-Level', format(new Decimal(2).pow(memoryUpgrades['imMult']), 'gray'));
    setText('mp-imMult-Cost', format(memoryCost('imMult')));
    setText('mp-mpMult-Level', format(mpMultiplier(), 'gray'));
    setText('mp-mpMult-Cost', format(memoryCost('mpMult')));

    setText('mp-imUpgrade1-Level', memoryUpgrades['imUpgrade1'] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp-imUpgrade1-Cost', format(memoryCost('imUpgrade1')));
    setText('mp-imUpgrade2-Level', memoryUpgrades['imUpgrade2'] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp-imUpgrade2-Cost', format(memoryCost('imUpgrade2')));
    // setText('mp33Level', memoryUpgrades[2][2] ? format(memoryMaxIm.log10(), 'gray') : 'ยังไม่ปลดล็อก');
    setText('mp-imUpgrade3-Cost', format(memoryCost('imUpgrade3')));

    setText('mp-imAb-Level', memoryUpgrades['imAb'] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp-imAb-Cost', format(memoryCost('imAb')));
    setText('mp-mpAb-Level', memoryUpgrades['mpAb'] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp-mpAb-Cost', format(memoryCost('mpAb')));

    setText('mp-permUpgrade1-Level', memoryUpgrades['permUpgrade1'] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp-permUpgrade1-Cost', format(memoryCost('permUpgrade1')));

    setText('mpImUnlockButton', format(mpImUnlockCost[imUnlocked - 1], 'white'));

    imCalculateMultiplier();
    memoryDisableButton();

    // document.getElementById('imAcStatus').style.display = acUnlocked ? 'block' : 'none';
    document.getElementById('imAbToggleDiv').style.display = memoryUpgrades['imAb'] ? 'flex' : 'none';
    document.getElementById('imAutoPrestigeToggleDiv').style.display = memoryUpgrades['mpAb'] ? 'flex' : 'none';
}

function memoryReset() {
    mp = new Decimal(0);
    let me51 = memoryUpgrades['permUpgrade1'];
    memoryUpgrades = {
        'imMult': zero,
        'mpMult': zero,
        'acAmount': zero,
        'acSpeed': zero,
        'acUpgrade': false,
        'imUpgrade1': false,
        'imUpgrade2': false,
        'imUpgrade3': false,
        'imAb': false,
        'mpAb': false,
        'permUpgrade1': me51
    }
    imReset();
    memoryInit();
    memoryMaxIm = im;
}

let mpImUnlockCost = [
    new Decimal('5e3'), new Decimal('5e7'),
    new Decimal('5e11'), new Decimal('1e6'),
    new Decimal('1e6'), new Decimal('1e6'),
    new Decimal('1e6'), new Decimal('1e6'),
    new Decimal('1e6'), new Decimal('0')];

function mpImUnlock() {
    if (mp.cmp(mpImUnlockCost[imUnlocked - 1]) >= 0) {
        if (imUnlocked < 10) {
            memoryReset();
            imUnlocked += 1;
            document.getElementById(`im${imUnlocked}`).style.display = 'flex';
        } else {
            memoryReset();
            imUnlocked = 2;
            fp = fp.add(1);
            for (var i = 10; i > imUnlocked; i--) {
                document.getElementById(`im${i}`).style.display = 'none';
            }
            for (var i = imUnlocked; i > 0; i--) {
                document.getElementById(`im${i}`).style.display = 'flex';
            }
        }
        
        setText('mpImUnlockButton', format(mpImUnlockCost[imUnlocked - 1], 'white'));
        setText(`im${imUnlocked}Button`, format(imLevels[imUnlocked - 1].cost()));
    }
}