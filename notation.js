'use strict';

var notation = 'exp';
notation = 'exp';

function msToDate(ms, d=3) {
    let x = ms;
    let str = '';
    let days = Math.floor(x / 86400000);
    x -= days * 86400000;
    let hours = Math.floor(x / 3600000);
    x -= hours * 3600000;
    let minutes = Math.floor(x / 60000);
    x -= minutes * 60000;
    let seconds = x / 1000;

    if (ms >= 86400000) str += ` ${days} วัน`;
    if (ms >= 3600000) str += ` ${hours} ชั่วโมง`;
    if (ms >= 60000) str += ` ${minutes} นาที`;
    return (str + ` ${seconds.toFixed(d)} วินาที`).substring(1);
}

function comma(str) {
    let pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b)/g;
    if (str.includes('.')) {
      pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b\.)/g;
    }
    return str.replace(pattern, ',');
}
// console.log(new Decimal('1.6e123'))
function few(value, d=2) {
    let i = 1;
    while (d >= 1) {
        if (value < 10 ** i) return value.toFixed(d);
        i++;
        d--;
    }
    return comma(value.toFixed(0));
}

function format(value, color='white', d=2, md=2, t=6, lt=4) {
    let sign = value.sign;
    let mag = value.mag;
    let layer = value.layer;
    let char = (sign == -1) ? '-' : '';
    let exp, man;
    if (sign == 0) {
        exp = 0;
        man = 0;
    }
    else {
        if (layer > 0 && mag < 10 ** t) {
            layer -= 1;
            exp = Math.floor(mag);
            man = 10 ** (mag - exp);
            if (man.toFixed(2) == '10.00') {
                exp += 1;
                man /= 10;
            }
        }
        else {
            exp = Math.floor(Math.log10(mag));
            man = mag / 10 ** exp;
        }
    }

    if (notation == 'e') {
        if (layer >= lt) return `E${layer}#${man.toFixed(d)}e${exp}`;
        if (layer == 0 && Math.abs(exp) < t) return few(value, d);
        // if (layer == 1 && exp < t) return char + `${man.toFixed(md)}e${few(exp)}`;
        return char + `${'e'.repeat(layer)}${man.toFixed(d)}e${exp}`;
    }
    if (notation == 'exp') {
        const open = `10<sup class="center ${color}">`.repeat(layer);
        const close = '</sup>'.repeat(layer + 1);
        if (layer == 0 && Math.abs(exp) < t) return few(value, d);
        return `${open}${man.toFixed(d)} × 10<sup class="center ${color}">${comma(exp.toString())}${close}`;
    }
}

// tests
// console.log(new Decimal('1e-60'), format(new Decimal('1e-60')))
// console.log(new Decimal('31.6'), format(new Decimal('31.6')))
// console.log(new Decimal('299792458'), format(new Decimal('299792458')))
// console.log(new Decimal('e9e3'), format(new Decimal('e9e3')))
// console.log(new Decimal('3e33333'), format(new Decimal('3ee33333')))
// console.log(new Decimal('e3e6'), format(new Decimal('ee6')))
// console.log(new Decimal('eeee6e14'), format(new Decimal('eeee6e14')))