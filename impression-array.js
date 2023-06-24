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


var im = new BigNum(800);      // rels

var imUp1 = new BigNum(10);
var imUp2 = new BigNum(0);
var imUp3 = new BigNum(0);
var imUp4 = new BigNum(0);

var imUp1T = new BigNum(10);
var imUp2T = new BigNum(0);
var imUp3T = new BigNum(0);
var imUp4T = new BigNum(0);

var imUpgrade = Array(4).fill(bn(0));
var imTotal = Array(4).fill(bn(0));

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
    a = [ 1, .5, .1, .1];
    b = [ 0,  1,  1,  1];
    c = [ 2,  3,  4,  5];
    d = [ 1,  3,  6, 10];
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

setText('imUp' + (n+1), imCost(n).smartToString(0));
setText('imUp' + (n+1) + 'A', imUpgrade[n].smartToString(0));
setText('imUp' + (n+1) + 'T', imTotal[n].smartToString(0));
setText('imUp' + (n+1) + 'R', imValue(n).smartToString(1));
window.imClick = (n) => {
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

// ---------- ---------- im upgrade 1

// x * 10^(1+2floor(x/10))
var imUp1Cost = () => {
    return BigNum.mul(
        BigNum.add(imUp1, bn(0)),
        BigNum.exp10(
            BigNum.add(
                bn(1),
                BigNum.mul(
                    bn(2),
                    BigNum.floor(
                        BigNum.div(
                            imUp1, bn(10)
                        )
                    )
                )
            )
        )
    );
}

// 2^floor(x/10) * tfloor(log2(t+1))
var imUp1Value = () => {
    if (BigNum.greater(bn(0), imUp1T)) return bn(0);
    return BigNum.mul(
        BigNum.exp2(
            BigNum.floor(
                BigNum.div(imUp1, bn(10))
            )
        ),
        BigNum.mul(
            imUp1T,
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imUp1T, bn(1))
                )
            )
        )
    );
}

var imPerSec = () => imValue(1);

setText('imUp1', imUp1Cost().smartToString(0, 'white', 6));
setText('imUp1A', imUp1.smartToString(0));
setText('imUp1T', imUp1T.smartToString(0));
window.imUp1Click = () => {
    if (BigNum.greater(im, imUp1Cost())) {
        imSub(imUp1Cost());
        imUp1 = BigNum.add(imUp1, bn(1));
        imUp1T = BigNum.add(imUp1T, bn(1));
        console.log(imUp1);
        console.log(imUp1Cost());
        setText('imUp1', imUp1Cost().smartToString(0, 'white', 6));
        setText('imUp1T', imUp1T.smartToString(0));
        setText('imUp1A', imUp1.smartToString(0));
    }
    else {
        rejectAnimation('imUp1');
    }
}

// im upgrade 2

// (1+.5x) * 10^(3+3floor(x/10))
var imUp2Cost = () => {
    return BigNum.mul(
        BigNum.add(BigNum.mul(imUp2, bn(0.5)), bn(1)),
        BigNum.exp10(
            BigNum.add(
                bn(3),
                BigNum.mul(
                    bn(3),
                    BigNum.floor(
                        BigNum.div(
                            imUp2, bn(10)
                        )
                    )
                )
            )
        )
    );
}

// 2^floor(x/10) * tfloor(log2(t+1))
var imUp2Value = () => {
    if (BigNum.greater(bn(0), imUp2T)) return bn(0);
    return BigNum.mul(
        BigNum.exp2(
            BigNum.floor(
                BigNum.div(imUp2, bn(10))
            )
        ),
        BigNum.mul(
            imUp2T,
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imUp2T, bn(1))
                )
            )
        )
    );
}

setText('imUp2', imUp2Cost().smartToString(0, 'white', 6));
setText('imUp2A', imUp2.smartToString(0));
setText('imUp2T', imUp2T.smartToString(0));
setText('imUp2R', imUp2Value().smartToString(1));
window.imUp2Click = () => {
    if (BigNum.greater(im, imUp2Cost())) {
        imSub(imUp2Cost());
        imUp2 = BigNum.add(imUp2, bn(1));
        imUp2T = BigNum.add(imUp2T, bn(1));
        // pc = 1 + 0.1 * Math.pow(2, imUp2 - 1);
        setText('imUp2', imUp2Cost().smartToString(0));
        setText('imUp2A', imUp2.smartToString(0));
        setText('imUp2T', imUp2T.smartToString(0));
        setText('imUp2R', imUp2Value().smartToString(1));
    }
    else {
        rejectAnimation('imUp2');
    }
}

// im upgrade 3

// (1+.1x) * 10^(6+4floor(x/10))
var imUp3Cost = () => {
    return BigNum.mul(
        BigNum.add(BigNum.mul(imUp3, bn(0.1)), bn(1)),
        BigNum.exp10(
            BigNum.add(
                bn(6),
                BigNum.mul(
                    bn(4),
                    BigNum.floor(
                        BigNum.div(
                            imUp3, bn(10)
                        )
                    )
                )
            )
        )
    );
}

// 2^floor(x/10) * tfloor(log2(t+1))
var imUp3Value = () => {
    if (BigNum.greater(bn(0), imUp3T)) return bn(0);
    return BigNum.mul(
        BigNum.exp2(
            BigNum.floor(
                BigNum.div(imUp3, bn(10))
            )
        ),
        BigNum.mul(
            imUp3T,
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imUp3T, bn(1))
                )
            )
        )
    );
}

setText('imUp3', imUp3Cost().smartToString(0, 'white', 6));
setText('imUp3A', imUp3.smartToString(0));
setText('imUp3T', imUp3T.smartToString(0));
setText('imUp3R', imUp3Value().smartToString(1));
window.imUp3Click = () => {
    if (BigNum.greater(im, imUp3Cost())) {
        imSub(imUp3Cost());
        imUp3 = BigNum.add(imUp3, bn(1));
        imUp3T = BigNum.add(imUp3T, bn(1));
        // pc = 1 + 0.1 * Math.pow(2, imUp2 - 1);
        setText('imUp3', imUp3Cost().smartToString(0, 'white', 6));
        setText('imUp3A', imUp3.smartToString(0));
        setText('imUp3T', imUp3T.smartToString(0));
        setText('imUp3R', imUp3Value().smartToString(1));
    }
    else {
        rejectAnimation('imUp3');
    }
}

// im upgrade 4

// (1+.1x) * 10^(6+4floor(x/10))
var imUp4Cost = () => {
    return BigNum.mul(
        BigNum.add(BigNum.mul(imUp4, bn(0.1)), bn(1)),
        BigNum.exp10(
            BigNum.add(
                bn(6),
                BigNum.mul(
                    bn(4),
                    BigNum.floor(
                        BigNum.div(
                            imUp4, bn(10)
                        )
                    )
                )
            )
        )
    );
}

// 2^floor(x/10) * tfloor(log2(t+1))
var imUp4Value = () => {
    if (BigNum.greater(bn(0), imUp4T)) return bn(0);
    return BigNum.mul(
        BigNum.exp2(
            BigNum.floor(
                BigNum.div(imUp4, bn(10))
            )
        ),
        BigNum.mul(
            imUp4T,
            BigNum.floor(
                BigNum.log2(
                    BigNum.add(imUp4T, bn(1))
                )
            )
        )
    );
}

setText('imUp4', imUp4Cost().smartToString(0, 'white', 6));
setText('imUp4A', imUp4.smartToString(0));
setText('imUp4T', imUp4T.smartToString(0));
setText('imUp4R', imUp4Value().smartToString(1));
window.imUp4Click = () => {
    if (BigNum.greater(im, imUp4Cost())) {
        imSub(imUp4Cost());
        imUp4 = BigNum.add(imUp4, bn(1));
        imUp4T = BigNum.add(imUp4T, bn(1));
        // pc = 1 + 0.1 * Math.pow(2, imUp2 - 1);
        setText('imUp4', imUp4Cost().smartToString(0, 'white', 6));
        setText('imUp4A', imUp4.smartToString(0));
        setText('imUp4T', imUp4T.smartToString(0));
        setText('imUp4R', imUp4Value().smartToString(1));
    }
    else {
        rejectAnimation('imUp4');
    }
}

// updating function

function imUp1Update() {
    imAdd(BigNum.div(
        imPerSec(),
        bn(20)
    ));
    setText('imAps', imPerSec().smartToString(0, 'dark-blue', 6));
    setText('imUp1R', imValue(0).smartToString(0, 'gray', 6));
}

function imUpdate(n) {
    imTotal[n-1] = BigNum.add(
        imTotal[n-1],
        BigNum.div(
            imUp2Value(),
            bn(20)
        )
    );
    setText('imUp' + (n+1) + 'R', imValue(n).smartToString(0, 'gray'));
}

setInterval(function() {
    imUpdate(3);
    imUpdate(2);
    imUpdate(1);
    imUp1Update();

    setText('imUp1T', imTotal[0].smartToString(0, 'black', 6));
    setText('imUp2T', imTotal[1].smartToString(0, 'black', 6));
    setText('imUp3T', imTotal[2].smartToString(0, 'black', 6));
    setText('imA', im.smartToString(2, 'blue', 9, 3));
    // t += 1;
}, 50);

function imAb1Buy() {

}

/*
var imPast = new BigNum(0, 0);
var imCurrent = im;
setInterval(function() {
    imPast = imCurrent;
    imCurrent = im;
    // console.log(imCurrent, imPast);
    var rate = BigNum.absSub(imCurrent, imPast).smartToString(2, 'dark-blue');
    // var sign = '';
    var sign = (BigNum.greater(imCurrent, imPast) && imCurrent.man != 0) ? '' : '-';
    // var rate = imUp1Value().smartToString(2, 'gray');
    setText('imAps', sign + rate);
}, 1000)
*/