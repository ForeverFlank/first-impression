import BigNum from './bignum.js';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}
var bn = (n) => new BigNum(n);

// VARIABLES --------------------------

var im = new BigNum(1000);      // rels

var imUpgrade = [
    new BigNum(10),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];
var imTotal = [
    new BigNum(10),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];
var imLocMul = [
    new BigNum(1),
    new BigNum(1),
    new BigNum(1),
    new BigNum(1),
    new BigNum(1)
];
var imAbCost = [
    new BigNum(1, 20),
    new BigNum(1, 35),
    new BigNum(1, 50),
    new BigNum(1, 65),
    new BigNum(1, 80)
];
var imUnlocked = 1;
var imAutobuy = [false, false, false, false, false];
var imAbToggle = [false, false, false, false, false];
var imMul = new BigNum(1);
var imP1 = new BigNum(0);
var imP2 = new BigNum(0);

// IMS --------------------------------

function imAdd(n) {
    im = BigNum.add(im, n);
}
function imSub(n) {
    im = BigNum.sub(im, n);
}

var imCost = (n) => {
    // var a = [ 1, .5, .2, .1, .1];
    var a = [ 1,  1,  1,  1,  1];
    var b = [ 2,  3,  4,  5,  6];
    var c = [ 1,  3,  6, 10, 15];
    a = a.map(x => bn(x));
    b = b.map(x => bn(x));
    c = c.map(x => bn(x));
    if (n != 0 && imUpgrade[n] == 0) {
        return BigNum.exp10(c[n]);
    }
    return BigNum.mul(
        BigNum.add(BigNum.mul(imUpgrade[n], a[n]), bn(0)),
        BigNum.exp10(
            BigNum.add(
                c[n],
                BigNum.mul(
                    b[n],
                    BigNum.floor(
                        BigNum.div(
                            imUpgrade[n], bn(10)
                        )
                    )
                )
            )
        )
    );
}

var imValue = (n) => {
    if (BigNum.greater(bn(0), imTotal[n])) return bn(0);
    return BigNum.mul(
        BigNum.exp2(
            BigNum.floor(
                BigNum.div(imUpgrade[n], bn(10))
            )
        ),
        BigNum.mul(
            BigNum.mul(
                imTotal[n],
                BigNum.mul(
                    imLocMul[n],
                    imMul
                )
            ),
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imTotal[n], bn(1))
                )
            )
        )
    );
}



window.imAbClick = (n) => {
    if (BigNum.greater(im, imAbCost[n]) && !imAutobuy[n]) {
        imSub(imAbCost[n]);
        imAutobuy[n] = true;
        imAbToggle[n] = true;
        var toggle = document.getElementById(`imAb${n+1}T`);
        toggle.disabled = false;
        toggle.innerText = 'ON';
        toggle.style.backgroundColor = '#4eb346';
    }
}

window.imAbToggle = (n) => {
    var toggle = document.getElementById(`imAb${n+1}T`);
    if (imAutobuy[n]) {
        imAbToggle[n] = !imAbToggle[n];
        if (imAbToggle[n]) {
            setText(`imAb${n+1}T`, 'ON');
            toggle.style.backgroundColor = '#4eb346';
        }
        else {
            setText(`imAb${n+1}T`, 'OFF');
            toggle.style.backgroundColor = '#e85050';
        }
    }
}

// need optimization
window.buyMax = () => {
    for (var n = 4; n >= 0; n--) {
        if (n < imUnlocked) {
            while (BigNum.greater(im, imCost(n))) {
                imSub(imCost(n));
                imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
                imTotal[n] = BigNum.add(imTotal[n], bn(1));
            }
            setText(`imUp${n+1}`, imCost(n).smartToString(0));
            setText(`imUp${n+1}T`, imTotal[n].smartToString(0, 'gray', 6));
            setText(`imUp${n+1}R`, imValue(n).smartToString(0, 'gray', 6));
        }
    }
}

// UPDATING FUNCTIONS -----------------

var imPerSec = () => imValue(0);

function imUpdate(n, t) {
    var button = document.getElementById(`imUp${n+1}`);
    if (BigNum.greater(im, imCost(n))) {
        button.style.backgroundImage = `linear-gradient(to right, #444 ${10 * (imUpgrade[n] % 10)}%, #222 ${10 * (imUpgrade[n] % 10) + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    else {
        button.style.backgroundImage = `linear-gradient(to right, #999 ${10 * (imUpgrade[n] % 10)}%, #777 ${10 * (imUpgrade[n] % 10) + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    if (n == 0) {
        imAdd(BigNum.div(
            imPerSec(),
            bn(1000 / t)
        ));
        setText('imAps', imPerSec().smartToString(0, 'dark-blue', 9, 3));
    }
    else {
        imTotal[n-1] = BigNum.add(
            imTotal[n-1],
            BigNum.div(
                imValue(n),
                bn(1000 / t)
            )
        );
    }
    setText(`imUp${n+1}T`, imTotal[n].smartToString(0, 'gray', 6));
    setText(`imUp${n+1}R`, imValue(n).smartToString(0, 'gray', 6));
}

var imP1Req = () => BigNum.add(bn(10), BigNum.mul(bn(5), imP1));
var imP2Req = () => BigNum.add(bn(40), BigNum.mul(bn(15), imP2));

function imPrestigeUpdate(n) {
    var button = document.getElementById(`imP${n}`);
    if (n == 1) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP1Req());
    }
    if (n == 2) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP2Req());
    }
}

// TODO: Optimize this
function imAutobuyer(n) {
    var button = document.getElementById(`imAb${n+1}`);
    var toggle = document.getElementById(`imAb${n+1}T`);
    if (imAutobuy[n]) {
        if (imAbToggle[n]) {
            button.style.backgroundColor = '#99b897';   // take a look at css
            while (BigNum.greater(im, imCost(n))) {
                imSub(imCost(n));
                imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
                imTotal[n] = BigNum.add(imTotal[n], bn(1));
                setText(`imUp${n+1}`, imCost(n).smartToString(0));
                setText(`imUp${n+1}T`, imTotal[n].smartToString(0, 'gray', 6));
                setText(`imUp${n+1}R`, imValue(n).smartToString(0, 'gray', 6));
            }
        }
    }
    else {
        toggle.disabled = true;
        toggle.style.backgroundColor = "#ecb2b2";
        button.disabled = !BigNum.greater(im, imAbCost[n]);
    }
}

// INIT -------------------------------

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
    if (imUnlocked < 6) {
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

// PRESTIGE ---------------------------

window.prestigeClick = (n) => {
    if (n == 1) {
        if (BigNum.greater(imUpgrade[4], imP1Req())) {
            im = new BigNum(0);
            imLocMul[4] = bn(1);
            imUpgrade = Array(5).fill(new BigNum(0));
            imTotal = Array(5).fill(new BigNum(0));
            imMul = BigNum.mul(imMul, bn(2));
            imP1 = BigNum.add(imP1, bn(1));
            initText();
        }
    }
    if (n == 2) {
        if (BigNum.greater(imUpgrade[4], imP2Req())) {
            im = new BigNum(0);
            for (var i = 0; i < 5; i++) {
                imLocMul[i] = BigNum.mul(imLocMul[i], BigNum.log10(imValue(i)));
            }
            imUpgrade = Array(5).fill(new BigNum(0));
            imTotal = Array(5).fill(new BigNum(0));
            imMul = new BigNum(1);
            imP1 = new BigNum(0);
            imP2 = BigNum.add(imP2, bn(1));
            initText();
        }
    }
}

// GAME SAVE --------------------------

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
    mainDiv.style.filter = 'blur(5px) brightness(55%)';
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

// im = new BigNum(1, 2000);

// CLOSE OFFLINE MENU -----------------

window.closeWindow = () => {
    document.getElementById('away').style.display = 'none';
    mainDiv.style.filter = 'none';
    mainDiv.style.pointerEvents = 'all';
}

// MAIN LOOP --------------------------

initText();
setInterval(function() {
    imPrestigeUpdate(2);
    imPrestigeUpdate(1);

    imUpdate(4, 50);
    imUpdate(3, 50);
    imUpdate(2, 50);
    imUpdate(1, 50);
    imUpdate(0, 50);

    setText('imA', im.smartToString(1, 'blue', 12, 3));
}, 50);

setInterval(function() {
    imAutobuyer(4);
    imAutobuyer(3);
    imAutobuyer(2);
    imAutobuyer(1);
    imAutobuyer(0);
}, 20);

setInterval(function() {
    var save = {
        date: Date.now(),
        im: im,
        imUpgrade : imUpgrade,
        imTotal : imTotal,
        imMul : imMul,
        imLocMul : imLocMul,
        imAutobuy : imAutobuy,
        imUnlocked : imUnlocked,
        imAbToggle : imAbToggle,
        imP1 : imP1,
        imP2 : imP2,
    }
    localStorage.setItem('save', JSON.stringify(save));
}, 5 * 1000);
