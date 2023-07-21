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