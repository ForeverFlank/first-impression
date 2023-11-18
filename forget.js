var fpDetails = {
    '1' : ['foo', new Decimal(1)],
    '2' : ['bar', new Decimal(3)],
    '3a' : ['baza', new Decimal(5e55)],
    '3b' : ['bazb', new Decimal(1e100)],
}

function fpClick(id) {
    setText('fpDescription', fpDetails[id][0]);
    setText('fpCost', format(fpDetails[id][1], 'black'));
}