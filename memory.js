'use strict';
// todo : change to log2(x/100)+1
// inv: 100 * 2^(y-1)
function imPrestigeAmount(mult = true) {
    if (imMaxIm.cmp(imPrestigeMinimum) < 0) {
        return new Decimal(0);
    }
    if (mult) {
        return imMaxIm.div(imPrestigeMinimum).log10().add(1).floor().mul(mpMultiplier());
    }
    return imMaxIm.div(imPrestigeMinimum).log10().add(1).floor();
}

function imPrestigeCost() {
    let result = imPrestigeAmount(false);
    if (imMaxIm.cmp(imPrestigeMinimum) < 0) {
        return new Decimal(0);
    }
    return new Decimal(10).pow(result.sub(1)).mul(imPrestigeMinimum);
    // return result.pow(3).mul(imPrestigeMinimum);
}

function imPrestigeNextCost() {
    let result = imPrestigeAmount(false);
    return new Decimal(10).pow(result).mul(imPrestigeMinimum);
    // return result.add(1).pow(3).mul(imPrestigeMinimum);
}

function memoryCost(p, q) {
    let ml = memoryLevel[p][q];
    let isMemory = (r, s) => (p == r && q == s);
    if (isMemory(0, 0))
        return new Decimal(1).mul(new Decimal(3).pow(ml));
    if (isMemory(0, 1))
        return new Decimal(2).mul(new Decimal(3).pow(ml));
    if (isMemory(0, 2))
        return new Decimal(5).mul(new Decimal(4).pow(new Decimal(ml)));
    if (isMemory(1, 0))
        return new Decimal(40).mul(new Decimal(3).pow(ml));
    if (isMemory(1, 1))
        return new Decimal(100).mul(new Decimal(3).pow(ml));
    if (isMemory(2, 0))
        return new Decimal(150);
    if (isMemory(2, 1))
        return new Decimal(500);
    if (isMemory(2, 2))
        return new Decimal(650);
    if (isMemory(3, 0))
        return new Decimal(1000);
};

function memoryCanBuy(p, q) {
    let cost = () => memoryCost(p, q);
    if (mp.cmp(cost()) < 0) return false;
    let isMemory = (r, s) => (p == r && q == s);
    if (isMemory(0, 2))
        return memoryLevel[0][2] < 5;
    if (isMemory(2, 0))
        return !memoryLevel[2][0];
    if (isMemory(2, 1))
        return !memoryLevel[2][1];
    if (isMemory(2, 2))
        return !memoryLevel[2][2];
    if (isMemory(3, 0))
        return !memoryLevel[3][0];
    return true;
}

function memoryDisableButton() {
    let memoryList = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1],
        [2, 0], [2, 1], [2, 2],
        [3, 0]];
    for (let i = 0; i < memoryList.length; i++) {
        let p = memoryList[i][0];
        let q = memoryList[i][1];
        document.getElementById(`mp${p + 1}${q + 1}`).disabled = !memoryCanBuy(p, q);
    }
}

function imPrestigeClick() {
    mp = mp.add(imPrestigeAmount());
    imReset();
    memoryDisableButton();
    if (tutorial == 2) {
        tutorial = 3;
        document.getElementById('imPrestigeButton').style.animation = 'none';
        document.getElementById('buttonMp').style.animation = 'highlight 1s linear infinite';
    }
}

function memoryBuy(p, q) {
    let cost = () => memoryCost(p, q);
    if (!memoryCanBuy(p, q)) return;
    mp = mp.sub(cost());
    let isMemory = (r, s) => (p == r && q == s);
    if (isMemory(0, 0)) {
        memoryLevel[0][0] = memoryLevel[0][0].add(1);
    } else if (isMemory(0, 1)) {
        memoryLevel[0][1] = memoryLevel[0][1].add(1);
    } else if (isMemory(0, 2)) {
        memoryLevel[0][2] = memoryLevel[0][2] + 1;
    } else if (isMemory(1, 0)) {
        memoryLevel[1][0] = memoryLevel[1][0].add(1);
        let acUnlocked = memoryLevel[1][0].cmp(0) > 0;
        document.getElementById('imAcDisplay').style.display = acUnlocked ? 'flex' : 'none';
    } else if (isMemory(1, 1)) {
        memoryLevel[1][1] = memoryLevel[1][1].add(1);
    } else if (isMemory(2, 0)) {
        memoryLevel[2][0] = true;
    } else if (isMemory(2, 1)) {
        memoryLevel[2][1] = true;
    } else if (isMemory(2, 2)) {
        memoryLevel[2][2] = true;
    } else if (isMemory(3, 0)) {
        memoryLevel[3][0] = true;
    }
    memoryInit();
    totalMemoryLevel = totalMemoryLevel.add(1);
    setText(`mp${p + 1}${q + 1}Cost`, format(cost()));
}

// init
function memoryInit() {
    setText('mp11Level', format(new Decimal(1.5).pow(memoryLevel[0][0]), 'gray'));
    setText('mp11Cost', format(memoryCost(0, 0)));
    setText('mp12Level', format(mpMultiplier(), 'gray'));
    setText('mp12Cost', format(memoryCost(0, 1)));
    setText('mp13Level', format(new Decimal(clickCooldown()), 'gray'));
    setText('mp13Cost', format(memoryCost(0, 2)));

    setText('mp21Level', format(autoClickerAmount(), 'gray', 0));
    setText('mp21Cost', format(memoryCost(1, 0)));
    setText('mp22Level', format(autoClickerPerClick(), 'gray', 1));
    setText('mp22Cost', format(memoryCost(1, 1)));

    setText('mp31Level', memoryLevel[2][0] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp31Cost', format(memoryCost(2, 0)));
    setText('mp32Level', memoryLevel[2][1] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp32Cost', format(memoryCost(2, 1)));
    setText('mp33Level', memoryLevel[2][2] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp33Cost', format(memoryCost(2, 2)));

    setText('mp41Level', memoryLevel[3][0] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    setText('mp41Cost', format(memoryCost(3, 0)));

    setText('mpImUnlockButton', format(mpImUnlockCost[imUnlocked - 1], 'white'));

    // setText('mp41Level', imUnlocked);
    // setText('mp41Cost', format(memoryCost(3, 0)));
    // setText('mp42Level', memoryLevel[3][1] ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก');
    // setText('mp42Cost', format(memoryCost(3, 1)));

    imCalculateMultiplier();
    memoryDisableButton();

    let acUnlocked = memoryLevel[1][0].cmp(0) > 0;
    document.getElementById('imAcDisplay').style.display = acUnlocked ? 'flex' : 'none';
    document.getElementById('imAbToggleDiv').style.display = memoryLevel[3][0] ? 'flex' : 'none';
}

function memoryReset() {
    mp = new Decimal(0);
    memoryLevel = [[zero, zero, 0], [zero, zero], [false, false, false]];
    imReset();
    memoryInit();
    memoryMaxIm = im;
}

let mpImUnlockCost = [new Decimal('1e4'), new Decimal('1e12'),
new Decimal('1e6'), new Decimal('1e6'),
new Decimal('1e6'), new Decimal('1e6'),
new Decimal('1e6'), new Decimal('1e6'),
new Decimal('1e6'), new Decimal('1e6')];

function mpImUnlock() {
    if (mp.cmp(mpImUnlockCost[imUnlocked - 1]) >= 0) {
        memoryReset();
        imUnlocked += 1;
        document.getElementById(`im${imUnlocked}`).style.display = 'flex';
        setText(`im${imUnlocked}Button`, format(imLevels[imUnlocked - 1].cost()));
    }
}