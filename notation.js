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

// below is a legacy xd
/*
function notation(man, exp, not, color='white', digits=2, thresold=6, md=1) {
    if (man.toFixed(md) == 'NaN') return '0.00';
    if (not == 'exp') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < thresold) return format((man * 10 ** exp).toFixed(0));
        return man.toFixed(md) + '×10<sup class="number center ' + color + '">' + exp + '</sup>';
    }
    if (not == 'engineer') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < thresold) return format((man * 10 ** exp).toFixed(0));
        md = 2;
        if (exp % 3 != 0) {
            md = 2 - (exp % 3);
            man *= 10 ** (exp % 3)
            exp -= exp % 3;
        }
        return man.toFixed(md) + '×10<sup class="number center ' + color + '">' + exp + '</sup>';
    }
    if (not == 'million') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < 6) return format((man * 10 ** exp).toFixed(0));
        if (exp <= 18) {
            md = 2;
            if (exp % 3 != 0) {
                md = 2 - (exp % 3);
                man *= 10 ** (exp % 3)
                exp -= exp % 3;
            }
            var str = man.toFixed(md) + ' ';
            if (exp % 6 == 3) {
                str += 'พัน';
                exp -= 3
            }
            str += 'ล้าน'.repeat(exp / 6);
            return str;
        }
        if (exp <= 60) {
            md = 2;
            if (exp % 3 != 0) {
                md = 2 - (exp % 3);
                man *= 10 ** (exp % 3)
                exp -= exp % 3;
            }
            var str = man.toFixed(md) + ' ';
            if (exp % 6 == 3) {
                str += 'พ';
                exp -= 3
            }
            str += 'ล'.repeat(exp / 6);
            return str + '.';
        }
        return man.toFixed(md) + '×10<sup class="number center ' + color + '">' + exp + '</sup>';
    }
    if (not == 'pali') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp == 3) return man.toFixed(2) + ' พัน';
        if (exp == 4) return man.toFixed(2) + ' หมื่น';
        if (exp == 5) return man.toFixed(2) + ' แสน';
        if (exp == 6) return man.toFixed(2) + ' ล้าน';
        if (exp <= 147) {
            var s = ['โกฏิ', 'ปโกฏิ', 'โกฏิปโกฏิ', 'นหุต', 'นินนหุต', 'อักโขเภนี', 'พินทุ', 'อพุทะ', 'นิระพุทะ', 'อหหะ', 'อพพะ', 'อฏฏะ', 'โสคันธิกะ', 'อุปละ', 'กมุทะ', 'ปทุมะ', 'ปุณฑริกะ', 'อกถาน', 'มหากถาน', 'อสงไขย'];
            man *= 10 ** (exp % 7);
            var str = format(man.toFixed(2));
            return str + ' ' + s[Math.floor(exp / 7) - 1];
        }
        return format((man * 10 ** exp).toFixed(0));
    }
}

// console.log(notation(1.57, 37, 'million'))
*/