// import BigNum from './bignum.js';

function setText(id, str) {
    document.getElementById(id).innerHTML = str;
}
var bn = (n) => new BigNum(n);

// VARIABLES --------------------------

var im = new BigNum(0);

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
    return BigNum.div(
        BigNum.mul(
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
        ),
        bn(2 ** n)
    );
}

// UPDATING FUNCTIONS -----------------

var imPerSec = () => imValue(0);    // dead code kekw

function imUpdate(n, t) {
    /*
    var button = document.getElementById(`imUp${n+1}`);
    var div = document.getElementById(`imUp${n+1}Div`);
    var buttonPos = 10 * (imUpgrade[n] % 10);
    if (BigNum.greater(im, imCost(n))) {
        button.style.backgroundImage = `linear-gradient(to right, #444 ${buttonPos}%, #222 ${buttonPos + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    else {
        button.style.backgroundImage = `linear-gradient(to right, #999 ${buttonPos}%, #777 ${buttonPos + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    */
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
    /*
    if (n >= 2) {
        var divPos = 100 * (imTotal[n - 1] % 1);
        div.style.backgroundImage = `linear-gradient(to right, #eaeaea ${divPos}%, #d8d8d8 ${divPos + 0.1}%)`;
    }
    setText(`imUp${n+1}T`, imTotal[n].smartToString(1, 'gray', 6));
    setText(`imUp${n+1}R`, imValue(n).smartToString(2, 'gray', 6));
    */
}

function imUIUpdate(n) {
    var button = document.getElementById(`imUp${n+1}`);
    // var div = document.getElementById(`imUp${n+1}Div`);
    var buttonPos = 10 * (imUpgrade[n] % 10);
    if (BigNum.greater(im, imCost(n))) {
        button.style.backgroundImage = `linear-gradient(to right, #3d3e41 ${buttonPos}%, #24282c ${buttonPos + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    else {
        button.style.backgroundImage = `linear-gradient(to right, #92939a ${buttonPos}%, #7f8184 ${buttonPos + 0.1}%)`;
        button.disabled = !BigNum.greater(im, imCost(n));
    }
    /*
    if (n >= 2) {
        var divPos = 100 * (imTotal[n - 1] % 1);
        div.style.backgroundImage = `linear-gradient(to right, #eaeaea ${divPos}%, #d8d8d8 ${divPos + 0.1}%)`;
    }
    */
    setText(`imUp${n+1}T`, imTotal[n].smartToString(1, 'gray', 6));
    setText(`imUp${n+1}R`, imValue(n).smartToString(2, 'gray', 6));
}

window.closeWindow = () => {
    var mainDiv = document.getElementById('main');
    document.getElementById('away').style.display = 'none';
    mainDiv.style.filter = 'none';
    mainDiv.style.pointerEvents = 'all';
}