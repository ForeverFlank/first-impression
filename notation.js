function format(string) {
    var pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b)/g;
    if (string.includes('.')) {
      pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b\.)/g;
    }
    return string.replace(pattern, ',');
  }

export default function notation(man, exp, not, color='white', digits=2, thresold=6, md=1) {
    if (man.toFixed(md) == 'NaN') return '0.00';
    if (not == 'exp') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < thresold) return format((man * 10 ** exp).toFixed(0));
        return man.toFixed(md) + ' × 10<sup class="number center ' + color + '">' + exp + '</sup>';
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
        return man.toFixed(md) + ' × 10<sup class="number center ' + color + '">' + exp + '</sup>';
    }
    if (not == 'million') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < 6) return format((man * 10 ** exp).toFixed(0));
        if (exp <= 36) {
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
        return man.toFixed(md) + ' × 10<sup class="number center ' + color + '">' + exp + '</sup>';
    }
    if (not == 'pali') {
        if (exp < 3) return (man * 10 ** exp).toFixed(digits);
        if (exp < 7) return format((man * 10 ** exp).toFixed(0));
        if (exp <= 147) {
            md = 2;
            var s = ['โกฏิ', 'ปโกฏิ', 'โกฏิปโกฏิ', 'นหุต', 'นินนหุต', 'อักโขเภนี', 'พินทุ', 'อพุทะ', 'นิระพุทะ', 'อหหะ', 'อพพะ', 'อฏฏะ', 'โสคันธิกะ', 'อุปละ', 'กมุทะ', 'ปทุมะ', 'ปุณฑริกะ', 'อกถาน', 'มหากถาน', 'อสงไขย'];
            var str = format(man.toFixed(md));
            return str + ' ' + s[Math.floor(exp / 7) - 1];
        }
        return format((man * 10 ** exp).toFixed(0));
    }
}

console.log(notation(1.57, 37, 'million'))