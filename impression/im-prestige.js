var imP1Req = () => BigNum.add(bn(10), BigNum.mul(bn(5), imP1));
var imP2Req = () => BigNum.add(bn(80), BigNum.mul(bn(15), imP2));

function imPrestigeUpdate(n) {
    var button = document.getElementById(`imP${n}`);
    if (n == 1) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP1Req());
    }
    if (n == 2) {
        button.disabled = !BigNum.greater(imUpgrade[4], imP2Req());
    }
}

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
                imLocMul[i] = BigNum.mul(imLocMul[i], BigNum.log100(imValue(i)));
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