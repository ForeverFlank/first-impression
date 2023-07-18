import BigNum from './bignum.js';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}

// VARIABLES --------------------------

var bn = (n) => new BigNum(n);

var im = new BigNum(0);      // rels

var imUpgrade = [
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];
var imTotal = [
    new BigNum(0),
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
    new BigNum(1, 40),
    new BigNum(1, 60),
    new BigNum(1, 80),
    new BigNum(1, 100)
];
var imAutobuy = [false, false, false, false, false];
var imAbToggle = [false, false, false, false, false];
var imMul = new BigNum(1);
var imP = [
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];
var imP1Prev = bn(1);
var imP1MulTotal = bn(1);

// IMS --------------------------------

function imAdd(n) {
    im = BigNum.add(im, n);
}
function imSub(n) {
    im = BigNum.sub(im, n);
}

var imCost = (n) => {
    var a = [ 1, .5, .2, .1, .1];
    var b = [ 0,  1,  1,  1,  1];
    var c = [ 2,  3,  4,  5,  6];
    var d = [ 1,  3,  6, 10, 15];
    a = a.map(x => bn(x));
    b = b.map(x => bn(x));
    c = c.map(x => bn(x));
    d = d.map(x => bn(x));
    return BigNum.mul(
        BigNum.add(BigNum.mul(imUpgrade[n], a[n]), b[n]),
        BigNum.exp10(
            BigNum.add(
                d[n],
                BigNum.mul(
                    c[n],
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

window.imClick = (n) => {
    if (BigNum.greater(im, imCost(n))) {
        imSub(imCost(n));
        imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
        imTotal[n] = BigNum.add(imTotal[n], bn(1));
        setText(`imUp${n+1}`, imCost(n).smartToString(0));
    }
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

window.buyMax = () => {
    for (var n = 4; n >= 0; n--) {
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


var imP1Mul = (reset) => {      // slightly inspired by antimatter dimensions
    if (BigNum.greater(imTotal[0], bn(1))) {
        var delta = BigNum.div(imTotal[0], imP1Prev);
        delta = BigNum.log2(BigNum.log2(delta));
        delta = BigNum.div(delta, bn(1));
        if (BigNum.greater(delta, bn(1))) {
            if (reset) {
                imP1Prev = imTotal[0];
            }
            return delta;
        }
    }
    return bn(1);

}
var imP2Req = () => BigNum.add(bn(10), BigNum.mul(bn(5), imP[1]));
var imP3Req = () => BigNum.add(bn(40), BigNum.mul(bn(15), imP[2]));

function imPrestigeUpdate(n) {
    var button = document.getElementById(`imP${n+1}`);
    if (n == 0) {
        button.disabled = !BigNum.greater(imUpgrade[4], bn(10));
        if (!button.disabled) {
            var multiplier = imP1Mul(false);
            setText('imP1', '×' + multiplier.smartToString(3, 'white', 6));
        }
    }
    if (n == 1) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP2Req());
    }
    if (n == 2) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP3Req());
    }
}

function imAutobuyer(n) {
    var button = document.getElementById(`imAb${n+1}`);
    var toggle = document.getElementById(`imAb${n+1}T`);
    if (imAutobuy[n]) {
        if (imAbToggle[n]) {
            button.style.backgroundColor = '#99b897';   // take a look at css
            if (BigNum.greater(im, imCost(n))) {
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
    setText('imP1', '10 Fifth')
    setText('imPV1', 'Currently: ×' + imP1MulTotal.smartToString(0, 'gray', 6));
    setText('imP2', imP2Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV2', 'Currently: ×' + imMul.smartToString(0, 'gray', 6));
    setText('imP3', imP3Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV3', 'Currently: ' + imP[2].smartToString(0, 'gray', 6));
    
}

// PRESTIGE ---------------------------

window.prestigeClick = (n) => {
    if (n == 0) {
        if (BigNum.greater(imUpgrade[4], bn(10))) {
            var multiplier = imP1Mul(true);
            console.log(multiplier);
            imP1MulTotal = BigNum.mul(imP1MulTotal, multiplier);
            imLocMul[4] = BigNum.mul(imLocMul[4], multiplier);
            for (var i = 0; i < 4; i++) {
                imTotal[i] = new BigNum(0);
            }
            setText('imPV1', 'Currently: ×' + imP1MulTotal.smartToString(3, 'gray', 6));
            initText();
        }
    }
    if (n == 1) {
        if (BigNum.greater(imUpgrade[4], imP2Req())) {
            im = new BigNum(0);
            imLocMul[4] = bn(1);
            imP1Prev = bn(1);
            imUpgrade = Array(5).fill(new BigNum(0));
            imTotal = Array(5).fill(new BigNum(0));
            imMul = BigNum.mul(imMul, bn(2));
            imP1MulTotal = bn(1);
            // imP[0] = BigNum.add(imP[0], bn(1));
            imP[1] = BigNum.add(imP[1], bn(1));
            initText();
        }
    }
    if (n == 2) {
        if (BigNum.greater(imUpgrade[4], imP3Req())) {
            im = new BigNum(0);
            for (var i = 0; i < 5; i++) {
                imLocMul[i] = BigNum.mul(imLocMul[i], BigNum.log10(imValue(i)));
            }
            imUpgrade = Array(5).fill(new BigNum(0));
            imTotal = Array(5).fill(new BigNum(0));
            imMul = new BigNum(1);
            // imP[0] = new BigNum(0);
            imP1Prev = bn(1);
            imP1MulTotal = bn(1);
            imP[1] = new BigNum(0);
            imP[2] = BigNum.add(imP[2], bn(1));
            initText();
        }
    }
    if (n == 3) {

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
    if (typeof savegame.imP !== 'undefined') {
        for (var i = 0; i < 4; i++) {
            var each = savegame.imP[i];
            imP[i] = new BigNum(each.man, each.exp);
        }
    }
    if (typeof savegame.imMul !== 'undefined') {
        imMul = new BigNum(savegame.imMul.man, savegame.imMul.exp);
    }
    if (typeof savegame.imAutobuy !== 'undefined') { imAutobuy = savegame.imAutobuy; }
    if (typeof savegame.imAbToggle !== 'undefined') { imAbToggle = savegame.imAbToggle; }
    if (typeof savegame.imP1Prev !== 'undefined') { imP1Prev = savegame.imP1Prev; }
    if (typeof savegame.imP1MulTotal !== 'undefined') {
        imP1MulTotal = new BigNum(savegame.imP1MulTotal.man, savegame.imP1MulTotal.exp);
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
    // console.log(tick, ticks, tickrate);

    /*
    filter: blur(5px) brightness(65%);
    pointer-events: none;
    */
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
    imPrestigeUpdate(3);
    imPrestigeUpdate(2);
    imPrestigeUpdate(1);
    imPrestigeUpdate(0);

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
        imAbToggle : imAbToggle,
        imP : imP,
        imP1Prev : imP1Prev,
        imP1MulTotal : imP1MulTotal
    }
    localStorage.setItem('save', JSON.stringify(save));
}, 5 * 1000);
