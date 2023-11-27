'use strict';

// Create im tabs
let ordinal = ['Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
let base = (n) => `<div class="tab" id="im${n}">
<div class="width-55">
  <p style="margin-top: 0;">${ordinal[n - 2]} Impression</p>
  <div class="space-between">
    <div class="flex-start width-45">
      <p id="im${n}Mult" class="tab-text">1</p>
      <p class="tab-text">&nbsp;×</p>
    </div>
    <p id="im${n}Total" class="tab-text width-45 center">0</p>
  </div>  
</div>
<button id="im${n}Button" onclick="imBuy(${n})" class="tab-button width-40">0</button>
</div>`;
let imDiv = document.getElementById('ims');
for (var i = 2; i <= 10; i++) {
    imDiv.insertAdjacentHTML('beforeend', base(i));
}
for (var i = 1; i <= 10; i++) {
    imLevels.push(new ImLevel(i,
        new Decimal(0),
        new Decimal(0),
        imLevelsInitMult[i - 1]));
}

const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    if (!button.className.includes('tablinks'))
        button.addEventListener('click', createRipple);
}

function saveObject() {
    return {
        tutorial: tutorial,
        timestamp: Date.now(),
        im: im,
        imUnlocked: imUnlocked,
        imLevels: imLevels,
        imPrestigeMinimum: imPrestigeMinimum,
        imAutobuyActivated: imAutobuyActivated,
        imAutoPrestigeActivated: imAutoPrestigeActivated,
        imAutoPrestigeThreshold: imAutoPrestigeThreshold,
        mp: mp,
        memoryLevel: memoryLevel,
        totalMemoryLevel: totalMemoryLevel,
        achievements: achievements
    };
}

function saveGame() {
    save = saveObject();
    // console.log(save)
    // console.log('Saved');
    window.windowSave = save;
    localStorage.setItem('save', JSON.stringify(save));
}

function autosave() {
    saveGame();
    setInterval(saveGame, 10 * 1000);
}

function loadDecimal(obj) {
    let x = new Decimal(0);
    x.sign = obj.sign;
    x.mag = obj.mag;
    x.layer = obj.layer;
    return x;
}

function loadImLevels(obj) {
    let x = [];
    for (let i = 0; i < 10; i++) {
        x.push(new ImLevel(i + 1,
            new Decimal(obj[i]['amount']),
            new Decimal(obj[i]['total']),
            new Decimal(obj[i]['multiplier'])));
    }
    return x;
}

function loadMpLevels(obj) {
    let x = [];
    let tryLoad = (p, q) => {
        try {
            return obj[p][q] != null ? obj[p][q] : 0
        } catch {
            return 0;
        }
    }
    x.push([new Decimal(tryLoad(0, 0)), new Decimal(tryLoad(0, 1)), tryLoad(0, 2)]);
    x.push([new Decimal(tryLoad(1, 0)), new Decimal(tryLoad(1, 1)), tryLoad(1, 2)]);
    x.push([tryLoad(2, 0), tryLoad(2, 1), tryLoad(2, 2)]);
    x.push([tryLoad(3, 0), tryLoad(3, 1)]);
    x.push([tryLoad(4, 0)]);
    return x;
}

function loadGame() {
    let hasOfflineProgress = false;
    let saveTimeStamp = Date.now();
    var sg = JSON.parse(localStorage.getItem('save'));
    console.log(sg);
    if (sg != null) {
        if (sg.timestamp != null) {
            saveTimeStamp = sg.timestamp;
            hasOfflineProgress = true;
        }
        if (sg.tutorial != null)
            tutorial = sg.tutorial;
        if (sg.im != null) {
            im = new Decimal(sg.im);
        } else {
            im = new Decimal(10);
        }
        if (sg.imUnlocked != null)
            imUnlocked = sg.imUnlocked;
        if (sg.imLevels != null)
            imLevels = loadImLevels(sg.imLevels);
        if (sg.imPrestigeMinimum != null)
            imPrestigeMinimum = new Decimal(sg.imPrestigeMinimum);
        if (sg.imAutobuyActivated != null)
            imAutobuyActivated = sg.imAutobuyActivated;
        if (sg.imAutoPrestigeActivated != null)
            imAutoPrestigeActivated = sg.imAutoPrestigeActivated;
        if (sg.imAutoPrestigeThreshold != null)
            imAutoPrestigeThreshold = new Decimal(sg.imAutoPrestigeThreshold);

        if (sg.mp != null)
            mp = new Decimal(sg.mp);
        if (sg.memoryLevel != null)
            memoryLevel = loadMpLevels(sg.memoryLevel);
        if (sg.totalMemoryLevel != null)
            totalMemoryLevel = new Decimal(sg.totalMemoryLevel);
        if (sg.achievements != null)
            achievements = sg.achievements;
    }

    if (hasOfflineProgress) {
        let oldIm = im;

        let tick = 0;
        let offlineTime = Date.now() - saveTimeStamp;
        if (DEBUG) {
            offlineTime = 2e7;  // debug 6 hours timewarp
        }

        setText('awayTime', msToDate(offlineTime, 0));

        let offlineTicks = offlineTime / tickrate;
        let offlineGameSpeed = 1;
        let maxOfflineTicks = 10000;
        if (offlineTicks > maxOfflineTicks) {
            offlineTicks = maxOfflineTicks;
            offlineGameSpeed = (offlineTime * tickrate / 1000) / offlineTicks;
        }
        else {
            offlineGameSpeed = 1;
        }
        console.log(offlineTime, offlineGameSpeed);

        document.getElementById('away').style.display = 'block';
        document.getElementById('blurBackground').style.display = 'block';
        let bar = document.getElementById('offlineBar');

        gameSpeed = offlineGameSpeed;
        for (let i = 0; i < offlineTicks; i++) {
            gameUpdate();
            // setSlider('offlineBar', tick / offlineTicks * 100);
            bar.style.width = `${tick / offlineTicks * 100}%`;
            ++tick;
        }
        gameSpeed = 1;
        setText('imGain', `${format(oldIm, 'black')} เป็น ${format(im, 'black')}`);
        document.getElementById('close').disabled = false;
    }
    else {
        closeOfflineProgressWindow();
    }

    // things init
    for (var i = 10; i > imUnlocked; i--) {
        document.getElementById(`im${i}`).style.display = 'none';
    }
    document.getElementById('imAbToggleCheckbox').checked = imAutobuyActivated;
    document.getElementById('imAutoPrestigeToggleCheckbox').checked = imAutoPrestigeActivated;
    document.getElementById('imAutoPrestigeThreshold').value = imAutoPrestigeThreshold;

    for (var i = 1; i <= 10; i++) {
        setText(`im${i}Button`, format(imLevels[i - 1].cost(), 'white'));
        setText(`im${i}Mult`, format(imLevels[i - 1].multiplier, 'gray'));
        setText(`im${i}Total`, format(imLevels[i - 1].total, 'gray'));
    }

    // ui inits
    if (tutorial == 0) {
        document.getElementById('im1Button').style.animation = 'highlight 1s linear infinite';
        document.getElementById('imClickButton').style.display = 'none';
        document.getElementById('imBuyMax').style.display = 'none';
    }
    memoryInit();
}

function closeOfflineProgressWindow() {
    document.getElementById('away').style.display = 'none';
    fadeOut('blurBackground', 150);
}

loadGame();
// let lostFocusSave = true;

function importSave() {
    let s = prompt('Input your save');
    save = s;
    localStorage.setItem('save', save);
    loadGame();
}

function exportSave() {
    prompt('Copy your save here', JSON.stringify(saveObject()));
}

function deleteSave() {
    localStorage.removeItem('save');
    console.log(localStorage.getItem('save'))
    // lostFocusSave = false;
    // loadGame();
    location.reload();
}

autosave();

document.addEventListener('visibilitychange', () => {
    setTimeout(() => {
        if (document.visibilityState == 'visible') {
            loadGame();
        } else {
            saveGame();
        }
    }, 100);
});