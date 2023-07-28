function initText() {
    for (var n = 0; n < 5; n++) {
        setText(`imUp${n+1}`, imCost(n).smartToString(0));
        setText(`imUp${n+1}T`, imTotal[n].smartToString(0, 'gray', 6));
        setText(`imUp${n+1}R`, imValue(n).smartToString(0, 'gray', 6));
        setText(`imAb${n+1}`, imAbCost[n].smartToString(1));
        var button = document.getElementById(`imAb${n+1}`);
        var toggle = document.getElementById(`imAb${n+1}T`);
        if (imAutobuy[n]) {
            button.disabled = true;
            button.style.backgroundColor = '#99b897';
            if (imAbToggle[n]) {
                setText(`imAb${n+1}T`, 'ON');
                toggle.style.backgroundColor = '#4eb346';
            }
            else {
                setText(`imAb${n+1}T`, 'OFF');
                toggle.style.backgroundColor = '#e85050';
            }
        }
        else {
            setText(`imAb${n+1}T`, 'OFF');
            toggle.disabled = true;
            toggle.style.backgroundColor = "#ecb2b2";
        }
    }
    if (imUnlocked < 5) {
        for (var i = imUnlocked + 2; i <= 5; i++) {
            document.getElementById(`imUp${i}Div`).style.display = 'none';
        }
        setText(`imUp${imUnlocked + 1}`, 'Unlock : ' + imCost(imUnlocked).smartToString(0));
    }
    setText('imP1', imP1Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV1', 'Currently: ×' + imMul.smartToString(0, 'gray', 6));
    setText('imP2', imP2Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV2', 'Currently: ' + imP2.smartToString(0, 'gray', 6));
}

function loadGame() {
    var savegame = JSON.parse(localStorage.getItem('save'));
    var savedate = Date.now();
    console.log(savegame)
    if (savegame !== null) {
        if (typeof savegame.date !== 'undefined') { savedate = savegame.date; }
        if (typeof savegame.im !== 'undefined') {
            im = new BigNum(savegame.im.man, savegame.im.exp);
        }
        if (typeof savegame.imUpgrade !== 'undefined') {
            for (var i = 0; i < 5; i++) {
                var each = savegame.imUpgrade[i];
                imUpgrade[i] = new BigNum(each.man, each.exp);
            }   
        }
        if (typeof savegame.imTotal !== 'undefined') {
            for (var i = 0; i < 5; i++) {
                var each = savegame.imTotal[i];
                imTotal[i] = new BigNum(each.man, each.exp);
            }
        }
        if (typeof savegame.imLocMul !== 'undefined') {
            for (var i = 0; i < 5; i++) {
                var each = savegame.imLocMul[i];
                imLocMul[i] = new BigNum(each.man, each.exp);
            }
        }
        if (typeof savegame.imMul !== 'undefined') {
            imMul = new BigNum(savegame.imMul.man, savegame.imMul.exp);
        }
        if (typeof savegame.imAutobuy !== 'undefined') { imAutobuy = savegame.imAutobuy; }
        if (typeof savegame.imUnlocked !== 'undefined') { imUnlocked = savegame.imUnlocked; }
        if (typeof savegame.imAbToggle !== 'undefined') { imAbToggle = savegame.imAbToggle; }
        if (typeof savegame.imP1 !== 'undefined') {
            imP1 = new BigNum(savegame.imP1.man, savegame.imP1.exp);
        }
        if (typeof savegame.imP2 !== 'undefined') {
            imP2 = new BigNum(savegame.imP2.man, savegame.imP2.exp);
        }

        var savedNotation = localStorage.getItem('notation');
        if (typeof savedNotation !== 'undefined') { 
            selectedNotation = savedNotation;
        }
        else {
            selectedNotation = 'exp';
            localStorage.setItem('notation', selectedNotation);
        }
        
        var timeAway = Date.now() - savedate;
        console.log(timeAway);

        var oldIm = im;

        var bar = document.getElementById('bar');
        var tick = 0;
        var tickrate = 1000;
        var ticks = timeAway / tickrate;
        
        if (ticks > 5000) {
            ticks = 5000;
            tickrate = timeAway / ticks;
        }
        var mainDiv = document.getElementById('main');
        // mainDiv.style.filter = 'blur(5px) brightness(55%)';
        mainDiv.style.filter = 'brightness(35%)';
        mainDiv.style.pointerEvents = 'none';

        var offlineUpdate = setInterval(function() {
            imAutobuyer(4);
            imAutobuyer(3);
            imAutobuyer(2);
            imAutobuyer(1);
            imAutobuyer(0);
            imUpdate(4, tickrate);
            imUpdate(3, tickrate);
            imUpdate(2, tickrate);
            imUpdate(1, tickrate);
            imUpdate(0, tickrate);
            bar.style.width = `${tick / ticks * 100}%`;
            ++tick;
            if (tick >= ticks) {
                bar.style.width = `100%`;
                document.getElementById('close').disabled = false;
                var newIm = im;
                setText('imGain', oldIm.smartToString(0, 'black', 6) + ' เป็น ' + newIm.smartToString(0, 'black', 6) + ' ims.');
                
                document.getElementById('away').style.display = 'block';
                clearInterval(offlineUpdate);
            }
        }, 4);
    }
    else {
        document.getElementById('away').style.display = 'none';
    }
}

loadGame();
initText();

var select = document.getElementById('notation');
select.addEventListener('change', () => {
    selectedNotation = select.value;
    localStorage.setItem('notation', selectedNotation);
    initText();
});