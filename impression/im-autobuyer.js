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
                setText(`imUp${n+1}R`, imValue(n).smartToString(2, 'gray', 6));
            }
        }
    }
    else {
        toggle.disabled = true;
        toggle.style.backgroundColor = "#ecb2b2";
        button.disabled = !BigNum.greater(im, imAbCost[n]);
    }
}