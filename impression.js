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
var imMul = new BigNum(1);
var imAbCost = [
    new BigNum(1, 20),
    new BigNum(1, 40),
    new BigNum(1, 60),
    new BigNum(0),
    new BigNum(10)
];
var imAutobuy = [false, false, false, false, false];

var imP1 = new BigNum(0);

function imAdd(n) {
    im = BigNum.add(im, n);
}
function imSub(n) {
    im = BigNum.sub(im, n);
}

var imCost = (n) => {
    var a = [ 1, .5, .1, .1, .1];
    var b = [ 0,  1,  1,  1,  1];
    var c = [ 2,  3,  4,  5,  6];
    var d = [ 1,  3,  6, 10, 16];
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
                imMul
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
        button.style.backgroundImage = `linear-gradient(to right, #aaa ${10 * (imUpgrade[n] % 10)}%, #777 ${10 * (imUpgrade[n] % 10) + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    if (n == 0) {
        imAdd(BigNum.div(
            imPerSec(),
            bn(20)
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
    button.disabled = !BigNum.greater(imUpgrade[4], imP1Req(imP1));
}

function imAutobuyer(n) {
    if (imAutobuy[n]) {
        if (BigNum.greater(im, imCost(n))) {
            imSub(imCost(n));
            imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
            imTotal[n] = BigNum.add(imTotal[n], bn(1));
            setText(`imUp${n+1}`, imCost(n).smartToString(0));
            setText(`imUp${n+1}T`, imTotal[n].smartToString(0));
            setText(`imUp${n+1}R`, imValue(n).smartToString(1));
        }
    }
}

var imP1Req = (n) => BigNum.mul(bn(15), BigNum.add(bn(1), imP1));

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
    setText('imP1', imP1Req(imP1).smartToString(0, 'gray', 6) + ' Fifth');
    setText('imPV1', 'Currently: ×' + imMul.smartToString(0, 'gray', 6));
}

window.prestigeClick = (n) => {
    if (n == 1) {
        if (BigNum.greater(imUpgrade[4], imP1Req(imP1))) {
            im = new BigNum(0);
            imUpgrade = Array(5).fill(new BigNum(0));
            imTotal = Array(5).fill(new BigNum(0));
            imMul = BigNum.mul(imMul, bn(2));
            imP1 = BigNum.add(imP1, bn(1));
            initText();
        }
    }
    if (n == 2) {

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
    if (typeof savegame.imMul !== 'undefined') {
        imMul = new BigNum(savegame.imMul.man, savegame.imMul.exp);
    }
    if (typeof savegame.imP1 !== 'undefined') {
        imP1 = new BigNum(savegame.imP1.man, savegame.imP1.exp);
    }
    if (typeof savegame.imAutobuy !== 'undefined') { imAutobuy = savegame.imAutobuy; }
    var timeAway = Date.now() - savedate;
    console.log(timeAway);

    var oldIm = im;
    for (var i = 0; i < timeAway / 50; i++) {
        imAutobuyer(0);
        imUpdate(4, 50);
        imUpdate(3, 50);
        imUpdate(2, 50);
        imUpdate(1, 50);
        imUpdate(0, 50);
    }
    var newIm = im;
    setText('imGain', BigNum.sub(newIm, oldIm).smartToString(0, 'black', 6) + ' im.');
    document.getElementById('away').style.display = 'block';
}
else {
    document.getElementById('away').style.display = 'none';
}

initText();

setInterval(function() {
    imAutobuyer(0);

    imPrestigeUpdate(0);

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
    var save = {
        date: Date.now(),
        im: im,
        imUpgrade : imUpgrade,
        imTotal : imTotal,
        imMul : imMul,
        imAutobuy : imAutobuy,
        imP1 : imP1
    }
    localStorage.setItem('save', JSON.stringify(save));
}, 5 * 1000);
