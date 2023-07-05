export default class BigNum {
    constructor(man, exp) {
        if (exp == undefined) {
            if (man != 0) {
                var d = Math.floor(Math.log10(man));
                man /= 10 ** d;
                exp = d;
            }
            else {
                exp = 0;
            }
        }
        this.man = man;
        this.exp = exp;
    }

    cleanMan() {
        this.man = Math.round(this.man * 1e6) / 1e6;
    }

    overflow() {
        /*
        while (this.man >= 10 && !(this.man == 0 && this.exp == 0)) {
            this.man /= 10;
            this.exp += 1;
        }
        */
        if (this.man != 0) {
            var d = Math.floor(Math.log10(this.man));
            this.man /= 10 ** d;
            this.exp += d;
            this.exp = Math.floor(this.exp);    // integer
        }
        this.cleanMan()
    }

    underflow() {
        this.overflow();
        /*
        while (this.man < 1 && !(this.man == 0 && this.exp == 0)) {
            this.man *= 10;
            this.exp -= 1;
        }
        */
    }

    static add(a, b) {
        var aMan = a.man;
        var aExp = a.exp;
        var bMan = b.man;
        var bExp = b.exp;
        if (aExp < bExp) {
            var temp = aMan;
            aMan = bMan;
            bMan = temp;
            var temp = aExp;
            aExp = bExp;
            bExp = temp;
        }
        if (aExp - bExp < 300) {
            bMan /= 10 ** (aExp - bExp);
        }
        else {
            bMan = 0;
        }
        aMan += bMan;
        var resultMan = aMan;
        var resultExp = aExp;
        var result = new BigNum(resultMan, resultExp);
        result.overflow();
        return result;
    }

    static sub(a, b) {
        if (a.man == 0 && b.man == 0) return new BigNum(0, 0); // both are zero
        var aMan = a.man;
        var aExp = a.exp;
        var bMan = b.man;
        var bExp = b.exp;
        if (aExp < bExp || (aExp == bExp && aMan < bMan)) {
            throw "Minuend is smaller than subtrahend!"
        }
        if (aExp - bExp < 300) {
            bMan /= 10 ** (aExp - bExp);
        }
        else {
            bMan = 0;
        }
        aMan -= bMan;
        var resultMan = aMan;
        var resultExp = aExp;
        if (resultMan != 0) {
            var result = new BigNum(resultMan, resultExp);
            result.underflow();
            return result;
        }
        return new BigNum(0, 0);
    }

    static mul(a, b) {
        var resultMan = a.man * b.man;
        var resultExp = a.exp + b.exp;
        var result = new BigNum(resultMan, resultExp);
        result.overflow();
        return result;
    }

    static div(a, b) {
        var resultMan = a.man / b.man;
        var resultExp = a.exp - b.exp;
        var result = new BigNum(resultMan, resultExp);
        result.overflow();  // in case a > b
        // result.underflow(); // in case a < b
        return result;
    }

    static floor(x) {
        if (x.exp >= 300)
            return x;
        return new BigNum(Math.floor(x.man * Math.pow(10, x.exp)));
    }

    /*
    static pow(a, b) {
        var aMan = a.man;
        var aExp = a.exp;
        var bMan = b.man;
        var bExp = b.exp;
        var exp = BigNum.floor(BigNum.mul(b, Math.log10(aMan)));
        var resultMan = mpow(aMan, BigNum.mul(bMan, new BigNum(mpow(10, bExp))));
        var resultExp = BigNum.mul(BigNum.mul(aExp, bMan), mpow(10, bExp));
        var result = new BigNum(resultMan, resultExp);
        result.overflow();
        return result;
    }
    */

    static pow(a, b) {
        // var aMan = a.man;
        // var aExp = a.exp;
        b = b.man * 10 ** b.exp;
        var resultMan = a.man ** b;
        var resultExp = a.exp * b;
        var result = new BigNum(resultMan, resultExp);
        result.overflow();
        return result;
    }

    static exp10(x) {           // x must be integer
        return new BigNum(1, x.man * 10 ** x.exp);
    }

    static exp2(x) {
        var a = Math.log10(2) * 10 ** (x.exp + Math.log10(x.man));
        return new BigNum(10 ** (a % 1), Math.floor(a));
    }

    static log2(x) {
        return new BigNum((Math.log10(x.man) + x.exp) / Math.log10(2));
    }

    static log10(x) {
        return new BigNum(Math.log10(x.man) + x.exp);
    }

    static log100(x) {          // to make code "cleaner" maybe
        return new BigNum((Math.log10(x.man) + x.exp) / 2);
    }

    static greater(a, b) {      // is actually a greater or equal
        if (a.man == 0 && b.man == 0) return true;  // both are zero
        if (a.exp > b.exp) return true;
        if (a.exp == b.exp) {
            if (a.man >= b.man) return true;
        }
        return false;
    }

    static less(a, b) {
        if (a.man == 0 && b.man == 0) return true;  // both are zero
        return !BigNum.greater(a, b);
    }

    static absSub(a, b) {
        if (BigNum.greater(a, b)) return BigNum.sub(a, b);
        return BigNum.sub(b, a);
    }

    toString() {
        return this.man.toFixed(2) + 'e' + this.exp;
    }

    smartToString(digits=2, color='white', thresold=9, md=1) {
        if (this.exp < 3) {
            return (this.man * 10 ** this.exp).toFixed(digits);
        }
        if (this.exp < thresold) {
            // regex magic
            return (this.man * 10 ** this.exp).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (this.man.toFixed(md) == 'NaN') return '0.00';
        return this.man.toFixed(md) + ' × 10<sup class="number center ' + color + '">' + this.exp + '</sup>';
    }
}