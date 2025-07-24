function comma(str) {
    let pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b)/g;
    if (str.includes(".")) {
        pattern = /(?=(?!^)\d{3}(?:\b|(?:\d{3})+)\b\.)/g;
    }
    return str.replace(pattern, ",");
}

function format(num, decimal = 2, smallDecimal = false) {
    if (!(num instanceof Decimal)) {
        num = new Decimal(num);
    }
    if (num.cmp(1e6) < 0) {
        return comma(num.mag.toFixed(smallDecimal ? decimal : 0));
    }
    if (num.layer == 0) {
        let mag = num.mag;
        let d = Math.floor(Math.log10(mag));
        mag = mag / 10 ** d;
        if (mag.toFixed(2) == "10.00") mag /= 10;
        return mag.toFixed(decimal) + " x 10" + "<sup>" + d + "</sup>";
    }
    if (num.layer == 1 && num.mag < 1e12) {
        let mag = 10 ** (num.mag - Math.floor(num.mag));
        let d = Math.floor(num.mag);
        if (mag.toFixed(2) == "10.00") mag /= 10;
        return (
            mag.toFixed(decimal) +
            " x 10" +
            "<sup>" +
            comma(d.toString()) +
            "</sup>"
        );
    }
    if (num.layer <= 1) {
        let layer = num.layer;
        let str = "";
        let mag = Math.log10(num.mag);
        if (mag >= 10) {
            layer++;
            mag = Math.log10(mag);
        }
        for (let l = 0; l <= layer; l++) {
            str += "10<sup>";
        }
        str += mag.toFixed(2);
        for (let l = 0; l <= layer; l++) {
            str += "</sup>";
        }
        return str;
    }

    let layer = num.layer + 1;
    let mag = Math.log10(num.mag);
    if (mag >= 10) {
        layer++;
        mag = Math.log10(mag);
    }
    return mag.toFixed(3) + "F" + layer;

}

function ordinal(num) {
    if (num % 1 !== 0) {
        return "Not an integer";
    }

    const suffixes = ["th", "st", "nd", "rd"];

    const mod100 = num % 100;
    const suffix = (mod100 >= 11 && mod100 <= 13) ? suffixes[0] : suffixes[num % 10] || suffixes[0];

    return num + suffix;
}

function ordinalWord(num) {
    const ordinalWords = [
        "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth",
        "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", 
        "seventeenth", "eighteenth", "nineteenth", "twentieth", "twenty-first", "twenty-second", 
        "twenty-third", "twenty-fourth", "twenty-fifth", "twenty-sixth", "twenty-seventh", 
        "twenty-eighth", "twenty-ninth", "thirtieth", "thirty-first", "thirty-second", 
        "thirty-third", "thirty-fourth", "thirty-fifth", "thirty-sixth", "thirty-seventh", 
        "thirty-eighth", "thirty-ninth", "fortieth", "forty-first", "forty-second", "forty-third",
        "forty-fourth", "forty-fifth", "forty-sixth", "forty-seventh", "forty-eighth", "forty-ninth",
        "fiftieth", "fifty-first", "fifty-second", "fifty-third", "fifty-fourth", "fifty-fifth",
        "fifty-sixth", "fifty-seventh", "fifty-eighth", "fifty-ninth", "sixtieth"
    ];

    if (num <= 0) return "Invalid number";
    if (num <= ordinalWords.length) return ordinalWords[num - 1];
    
    return ordinal(num);
}

export { format, ordinalWord }