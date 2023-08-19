function imPrestigeAmount() {
    if (im.cmp(new Decimal(50)) < 0) {
        return new Decimal(0);
    }
    return im.mul(2).log10().sub(1).floor();
}

function imPrestigeNextCost() {
    let result = imPrestigeAmount();
    return new Decimal(10).pow(result.add(2)).div(2)
}

function imPrestigeClick() {
    mp = mp.add(imPrestigeAmount());
    im = new Decimal(0);
}