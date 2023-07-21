window.imClick = (n) => {
    console.log(n, imUnlocked);
    if (BigNum.greater(im, imCost(n))) {
        imSub(imCost(n));
        imUpgrade[n] = BigNum.add(imUpgrade[n], bn(1));
        imTotal[n] = BigNum.add(imTotal[n], bn(1));
        if (n == imUnlocked) {
            imUnlocked++;
            document.getElementById(`imUp${imUnlocked + 1}Div`).style.display = 'flex';
            setText(`imUp${imUnlocked + 1}`, 'Unlock : ' + imCost(imUnlocked).smartToString(0));
        }
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