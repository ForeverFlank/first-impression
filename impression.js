import BigNum from './bignum.js';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}

/*
function rejectAnimation(id) {
    document.getElementById(id).animate(
        [
            { backgroundColor: 'red' },
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' },
        ], {
          duration: 400
        }
    );
}
*/

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
var imMul = new BigNum(1);
var imP1 = new BigNum(0);
var imP2 = new BigNum(0);

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
        // pc = 1 + 0.1 * Math.pow(2, imUp2 - 1);
        setText(`imUp${n+1}`, imCost(n).smartToString(0));
        // setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
        setText(`imUp${n+1}T`, imTotal[n].smartToString(0));
        setText(`imUp${n+1}R`, imValue(n).smartToString(1));
    }
    // else {
    //     rejectAnimation('imUp' + (n+1));
    // }
}

window.imAbClick = (n) => {
    console.log('ckci')
    if (BigNum.greater(im, imAbCost[n]) && !imAutobuy[n]) {
        imSub(imAbCost[n]);
        imAutobuy[n] = true;
    }
}

var imPerSec = () => imValue(0);

// updating function

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
        setText('imAps', imPerSec().smartToString(0, 'dark-blue', 6));
        setText('imUp1R', imValue(0).smartToString(0, 'gray', 6));
    }
    else {
        imTotal[n-1] = BigNum.add(
            imTotal[n-1],
            BigNum.div(
                imValue(n),
                bn(1000 / t)
            )
        );
        setText('imUp' + (n+1) + 'R', imValue(n).smartToString(0, 'gray', 6));
    }
}

function imPrestigeUpdate(n) {
    var button = document.getElementById(`imP${n+1}`);
    if (n == 0) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP1Req());
    }
    if (n == 1) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP2Req());
    }
}

function imAutobuyer(n) {
    var button = document.getElementById(`imAb${n+1}`);
    if (imAutobuy[n]) {
        button.style.backgroundColor = '#99b897';   // take a look at css
        if (BigNum.greater(im, imCost(n))) {
            imSub(imCost(n));
            imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
            imTotal[n] = BigNum.add(imTotal[n], bn(1));
            setText(`imUp${n+1}`, imCost(n).smartToString(0));
            setText(`imUp${n+1}T`, imTotal[n].smartToString(0));
            setText(`imUp${n+1}R`, imValue(n).smartToString(1));
        }
    }
    else {
        button.disabled = !BigNum.greater(im, imAbCost[n]);
    }
}

var imP1Req = () => BigNum.add(bn(15), BigNum.mul(bn(15), imP1));
var imP2Req = () => BigNum.add(bn(40), BigNum.mul(bn(15), imP2));

function initText() {
    for (var n = 0; n < 5; n++) {
        // setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
        setText(`imUp${n+1}`, imCost(n).smartToString(0));
        setText(`imUp${n+1}T`, imTotal[n].smartToString(0));
        setText(`imUp${n+1}R`, imValue(n).smartToString(1));
        // setText(`imAb${n+1}`, imAbCost[n].smartToString(1));
    }
    for (var n = 0; n < 3; n++) {
        // setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
        setText(`imAb${n+1}`, imAbCost[n].smartToString(1));
    }
    setText('imP1', imP1Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV1', 'Currently: ×' + imMul.smartToString(0, 'gray', 6));
    setText('imP2', imP2Req().smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV2', 'Currently: (' + imP2.smartToString(0, 'gray', 6) + ')');
}

window.prestigeClick = (n) => {
    if (n == 1) {
        if (BigNum.greater(imUpgrade[4], imP1Req())) {
            im = new BigNum(0);
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
            imUpgrade = Array(5).fill(new BigNum(0));
            for (var i = 0; i < 5; i++) {
                imLocMul[i] = BigNum.add(
                    imLocMul[i],
                    BigNum.log100(imTotal[i])
                );
            }
            imTotal = Array(5).fill(new BigNum(0));
            imMul = new BigNum(1);
            imP1 = new BigNum(0);
            imP2 = BigNum.add(imP2, bn(1));
            initText();
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
        setText(`imUp${n+1}T`, imTotal[n].smartToString(0));
        setText(`imUp${n+1}R`, imValue(n).smartToString(1));
    }
}

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
    if (typeof savegame.imP1 !== 'undefined') {
        imP1 = new BigNum(savegame.imP1.man, savegame.imP1.exp);
    }
    if (typeof savegame.imP2 !== 'undefined') {
        imP2 = new BigNum(savegame.imP2.man, savegame.imP2.exp);
    }
    if (typeof savegame.imAutobuy !== 'undefined') { imAutobuy = savegame.imAutobuy; }
    var timeAway = Date.now() - savedate;
    console.log(timeAway);

    var oldIm = im;
    var ticks = Math.floor(timeAway / 1000);
    // var bar = document.getElementById('bar');
    // ticks = 20000;
    for (var i = 0; i < ticks; i++) {
        imAutobuyer(0);
        imUpdate(4, 1000);
        imUpdate(3, 1000);
        imUpdate(2, 1000);
        imUpdate(1, 1000);
        imUpdate(0, 1000);
        // bar.style.width = `${i / ticks * 100}%`;
    }
    // bar.style.width = `100%`;
    var newIm = im;
    setText('imGain', oldIm.smartToString(0, 'black', 6) + ' เป็น ' + newIm.smartToString(0, 'black', 6) + ' ims.');
    document.getElementById('away').style.display = 'block';
}
else {
    document.getElementById('away').style.display = 'none';
}

initText();
setInterval(function() {
    imPrestigeUpdate(0);
    imPrestigeUpdate(1);

    imUpdate(4, 50);
    imUpdate(3, 50);
    imUpdate(2, 50);
    imUpdate(1, 50);
    imUpdate(0, 50);

    setText('imUp1T', imTotal[0].smartToString(0, 'black', 6));
    setText('imUp2T', imTotal[1].smartToString(0, 'black', 6));
    setText('imUp3T', imTotal[2].smartToString(0, 'black', 6));
    setText('imUp4T', imTotal[3].smartToString(0, 'black', 6));
    setText('imUp5T', imTotal[4].smartToString(0, 'black', 6));
    setText('imA', im.smartToString(2, 'blue', 15, 3));

    // setText('imP1', `Reset (${imP1})<br>Requires ${imP1Req(imP1)}`);
    // t += 1;
}, 50);

setInterval(function() {
    imAutobuyer(0);
    imAutobuyer(1);
    imAutobuyer(2);
}, 200);

setInterval(function() {
    var save = {
        date: Date.now(),
        im: im,
        imUpgrade : imUpgrade,
        imTotal : imTotal,
        imMul : imMul,
        imLocMul : imLocMul,
        imAutobuy : imAutobuy,
        imP1 : imP1,
        imP2 : imP2
    }
    localStorage.setItem('save', JSON.stringify(save));
}, 5 * 1000);
