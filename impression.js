import BigNum from './bignum.js';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}

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

var bn = (n) => new BigNum(n);


var im = new BigNum(0);      // rels

var imUpgrade = [
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];
var imTotal = [
    new BigNum(0),
    new BigNum(0),
    new BigNum(0),
    new BigNum(0)
];

/*
var imAb1 = false;
var imAb2 = false;
var imAb3 = false;

var im = new BigNum(0);      // rels

var imUp1 = new BigNum(30);
var imUp2 = new BigNum(10);
var imUp3 = new BigNum(10);

var imUp1T = new BigNum(6000);
var imUp2T = new BigNum(300);
var imUp3T = new BigNum(10);
*/
var t = 1;

function imAdd(n) {
    im = BigNum.add(im, n);
}

function imSub(n) {
    im = BigNum.sub(im, n);
}

function ticks(sec) {
    return sec * 20;
}

window.imClick = () => {
    imAdd(pc());
}

// TODO
// prestige layer : remove all im t variable while only using the im a

var imCost = (n) => {
    var a = [ 1, .5, .1, .1];
    var b = [ 0,  1,  1,  1];
    var c = [ 2,  3,  4,  5];
    var d = [ 1,  3,  6, 10];
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
            imTotal[n],
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imTotal[n], bn(1))
                )
            )
        )
    );
}

for (var n = 0; n < 4; n++) {
    setText('imUp' + (n+1), imCost(n).smartToString(0));
    setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
    setText('imUp' + (n+1) + 'T', imTotal[n].smartToString(0));
    setText('imUp' + (n+1) + 'R', imValue(n).smartToString(1));
}
window.imClick = (n) => {
    console.log(imCost(n));
    if (BigNum.greater(im, imCost(n))) {
        imSub(imCost(n));
        imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
        imTotal[n] = BigNum.add(imTotal[n], bn(1));
        // pc = 1 + 0.1 * Math.pow(2, imUp2 - 1);
        setText('imUp' + (n+1), imCost(n).smartToString(0));
        setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
        setText('imUp' + (n+1) + 'T', imTotal[n].smartToString(0));
        setText('imUp' + (n+1) + 'R', imValue(n).smartToString(1));
    }
    else {
        rejectAnimation('imUp' + (n+1));
    }
}

var imPerSec = () => imValue(0);

// updating function

function imUpdate(n) {
    
    document.getElementById('imUp' + (n+1)).disabled = !(BigNum.greater(im, imCost(n)));
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
                bn(20)
            )
        );
        setText('imUp' + (n+1) + 'R', imValue(n).smartToString(0, 'gray'));
    }
}

setInterval(function() {
    imUpdate(3);
    imUpdate(2);
    imUpdate(1);
    imUpdate(0);

    setText('imUp1T', imTotal[0].smartToString(0, 'black', 6));
    setText('imUp2T', imTotal[1].smartToString(0, 'black', 6));
    setText('imUp3T', imTotal[2].smartToString(0, 'black', 6));
    setText('imA', im.smartToString(2, 'blue', 9, 3));
    // t += 1;
}, 50);