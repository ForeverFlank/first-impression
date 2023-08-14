var lastSave = Date.now();
setInterval(function() {
    imPrestigeUpdate(2);
    imPrestigeUpdate(1);
    imUpdate(4, 50);
    imUpdate(3, 50);
    imUpdate(2, 50);
    imUpdate(1, 50);
    imUpdate(0, 50);
    setText('imA', im.smartToString(1, 'blue', 12, 3));
    if (Date.now() - lastSave > 30 * 1000) {
        loadGame();
        lastSave = Date.now();
    }
}, 50);

setInterval(function() {
    imAutobuyer(4);
    imAutobuyer(3);
    imAutobuyer(2);
    imAutobuyer(1);
    imAutobuyer(0);
}, 20);

setInterval(function() {
    imUIUpdate(4);
    imUIUpdate(3);
    imUIUpdate(2);
    imUIUpdate(1);
    imUIUpdate(0);
}, 1000 / 30);

setInterval(function() {
    lastSave = Date.now();
    var save = {
        date: Date.now(),
        im: im,
        imUpgrade : imUpgrade,
        imTotal : imTotal,
        imMul : imMul,
        imLocMul : imLocMul,
        imAutobuy : imAutobuy,
        imUnlocked : imUnlocked,
        imAbToggle : imAbToggle,
        imMemory : imMemory,
        imP1 : imP1,
        imP2 : imP2,
    }
    localStorage.setItem('save', JSON.stringify(save));
}, 5 * 1000);
