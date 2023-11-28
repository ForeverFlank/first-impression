var fgSelecting = null;

var fgDetails = {
    '1' : ['foo', new Decimal(1)],
    '2' : ['bar', new Decimal(3)],
    '3a' : ['baza', new Decimal(5e55)],
    '3b' : ['bazb', new Decimal(1e100)],
}

function fgClick(id) {
    setText('fgSelecting', 'Node:&nbsp;' + id);
    setText('fgDescription', fgDetails[id][0]);
    setText('fgCost', format(fgDetails[id][1], 'black'));
}

function fgBuy() {

}