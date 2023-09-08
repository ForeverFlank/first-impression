function imPrestigeAmount(mult=true) {
    if (im.cmp(imPrestigeMinimum) < 0) {
        return new Decimal(0);
    }
    if (mult)
        return im.div(imPrestigeMinimum).sqrt().floor().mul(mpMultiplier);
    return im.div(imPrestigeMinimum).sqrt().floor();
}

function imPrestigeCost() {
    let result = imPrestigeAmount(false);
    return result.pow(2).mul(imPrestigeMinimum);
}

function imPrestigeNextCost() {
    let result = imPrestigeAmount(false);
    return result.add(1).pow(2).mul(imPrestigeMinimum);
}

function memoryUnlocked(p, q) {
    if (p == 0) {
        return true;
    }
    else if (p == 1) {
        return totalMemoryLevel.cmp(4) >= 0;
    }
    else if (p == 2) {
        return totalMemoryLevel.cmp(8) >= 0;
    }
}

function memoryLock() {
    let memoryArray = [[1, 0], [1, 1], [2, 0], [2, 1]]
    for (let i = 0; i < memoryArray.length; i++) {
        p = memoryArray[i][0];
        q = memoryArray[i][1];
        let locked = memoryUnlocked(p, q);
        document.getElementById(`mp${p+1}${q+1}`).disabled = !locked;
        document.getElementById(`mp${p+1}${q+1}Span`).style.display = locked ? 'block' : 'none';
        document.getElementById(`mp${p+1}${q+1}Locked`).style.display = !locked ? 'block' : 'none';
    }
    // document.getElementById('mp22').disabled = !memoryUnlocked(1, 1);
}

function imPrestigeClick() {
    mp = mp.add(imPrestigeAmount());
    imInit();
    if (tutorial == 2) {
        tutorial = 3;
        document.getElementById('imPrestigeButton').style.animation = 'none';
        document.getElementById('buttonMp').style.animation = 'highlight 1s linear infinite';
    }
}

function memoryCost(p, q) {
    let ml = memoryLevel[p][q];
    if (p == 0) {
        if (q == 0) {
            return new Decimal(1).mul(new Decimal(2).pow(ml));
        }
        else if (q == 1) {
            return new Decimal(2).mul(new Decimal(3).pow(ml));
        }
    }
    else if (p == 1) {
        if (q == 0) {
            return new Decimal(2).mul(new Decimal(2).pow(ml));
        }
        else if (q == 1) {
            return new Decimal(5).mul(new Decimal(2).pow(ml));
        }
    }
    else if (p == 2) {
        if (q == 0) {
            return new Decimal(10).mul(new Decimal(100).pow(new Decimal(ml)));
        }
        else if (q == 1) {
            return new Decimal(1e6);
        }
    }
};

function memoryUpgrade(p, q) {
    let cost = () => memoryCost(p, q);
    if (mp.cmp(cost()) < 0) return;
    if (p == 0) {
        if (q == 0) {
            mp = mp.sub(cost());
            imLevels[0].multiplier = imLevels[0].multiplier.mul(1.2);
            memoryLevel[0][0] = memoryLevel[0][0].add(1);
            totalMemoryLevel = totalMemoryLevel.add(1);
            setText('mp11Level', format(new Decimal(1.2).pow(memoryLevel[0][0]), 'white'));
            setText('mp11Cost', format(cost()));
        }
        if (q == 1) {
            mp = mp.sub(cost());
            mpMultiplier = mpMultiplier.mul(2);
            memoryLevel[0][1] = memoryLevel[0][1].add(1);
            totalMemoryLevel = totalMemoryLevel.add(1);
            setText('mp12Level', format(new Decimal(2).pow(memoryLevel[0][1]), 'white'));
            setText('mp12Cost', format(cost()));
        }
    }
    else if (p == 1) {
        if (q == 0) {
            mp = mp.sub(cost());
            imAutoclickerAmount = imAutoclickerAmount.add(1);
            memoryLevel[1][0] = memoryLevel[1][0].add(1);
            totalMemoryLevel = totalMemoryLevel.add(1);
            setText('mp21Level', format(memoryLevel[1][0], 'white', 0));
            setText('mp21Cost', format(cost()));
        }
        if (q == 1) {
            mp = mp.sub(cost());
            imAutoclickerPerClick = imAutoclickerPerClick.add(0.5);
            memoryLevel[1][1] = memoryLevel[1][1].add(1);
            totalMemoryLevel = totalMemoryLevel.add(1);
            setText('mp22Level', format(imAutoclickerPerClick, 'white', 1));
            setText('mp22Cost', format(cost()));
        }
    }
    else if (p == 2) {
        if (q == 0 && memoryLevel[2][0] < 10) {
            mp = mp.sub(cost());
            memoryLevel[2][0] += 1;
            totalMemoryLevel = totalMemoryLevel.add(1);
            imUnlocked += 1;
            document.getElementById(`im${imUnlocked}`).style.display = 'flex';
            setText(`im${i}Button`, format(imLevels[i - 1].cost()));  
            setText('mp31Level', memoryLevel[2][0]);
            setText('mp31Cost', format(cost()));
        }
        if (q == 1 && !memoryLevel[2][1]) {
            mp = mp.sub(cost());
            memoryLevel[2][1] = true;
            totalMemoryLevel = totalMemoryLevel.add(1);
            setText('mp32Level', 'ปลดล็อกแล้ว');
            setText('mp32Cost', format(cost()));
        }
    }
    memoryLock();
}

// init
function memoryInit() {
    setText('mp11Level', format(new Decimal(1.2).pow(memoryLevel[0][0]), 'white'));
    setText('mp11Cost', format(memoryCost(0, 0)));
    setText('mp12Level', format(new Decimal(1.2).pow(memoryLevel[0][1]), 'white'));
    setText('mp12Cost', format(memoryCost(0, 1)));
    setText('mp21Level', format(memoryLevel[1][0], 'white', 0));
    setText('mp21Cost', format(memoryCost(1, 0)));
    setText('mp22Level', format(imAutoclickerPerClick, 'white', 1));
    setText('mp22Cost', format(memoryCost(1, 1)));
    setText('mp31Cost', format(memoryCost(2, 0)));
    setText('mp32Cost', format(memoryCost(2, 1)));
    memoryLock();
}