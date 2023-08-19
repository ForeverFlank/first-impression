function imClick(n) {
    if (n == 1) {
        if (tutorial == 0) {
            tutorial = 1;
            document.getElementById('im1Button').style.animation = 'none';
        }
        im = im.add(imPerClick);
        setText('imAmount', im);
    }
    else {
        imLevels[n - 1].amount = imLevels[n - 1].amount.add(1);
        imLevels[n - 1].total = imLevels[n - 1].total.add(1);
    }
}