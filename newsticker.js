var news = [
    'สวัสดี',

    'อะไรเอ่ยใหญ่กว่าจักรวาล? ใช่แล้ว จักรวาลชุบแป้งทอด',
    'ทำไมต้องเปิดตู้เสื้อผ้าเบา ๆ ? ใช่แล้ว เพราะมีชุดนอนอยู่',
    'จังหวัดอะไรตลกที่สุด? ใช่แล้ว จังหวัดประจวบ คิกคิก ขำ',
    'คนไทยไม่ชอบปลาอะไร? ใช่แล้ว ปลายุ[ข้อความนี้ถูกปิดกั้นการมองเห็นโดยราชอาณาจักรไทย]',

    'เพื่อนอะไรบอกฝันดีก่อนนอน',
    'ไก่ที่หมดจานก็เหมือนกับการที่หมดใจ ส่วนไก่ที่ไม่มีจานก็เหมือนกับการที่ไม่มีใจ',
    'ไก่ที่หมดจานก็เหมือนกับการที่กินไก่',
    'ไม่อยากเป็นไข้ที่ชน แต่อยากเป็นคนที่ใช่',
    'คืนที่ดาวเต็มฟ้าฉันจินตนาการถึงหน้าเธอ',
    'ใครเพื่อนแก',
    'เธอคือทองแดงและเทลลูเรียมใช่ไหม ทำไมเธอถึง CuTe จัง (เคมี rizz)',
    'เธอคือหลุมดำใช่ไหม เพราะทำไมตอนอยู่กับเธอเวลาถึงช้าลง (วิทย์-คณิต rizz)',
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup>&ensp; ปี',
    'รักนะ 10<sup>3000</sup>',

    'ยายมีขายหอยยายมอยขายหมีขนหมีของยายมอยติดอยู่บนหอยของยายมี',
    'ผมที่กำลังวิ่งหนีป้าขายตามสั่งคนนึงที่เป็นคนใต้หลังจากที่ผมบอกป้าว่า "หรอยจังนะป้า" (ผมคิดว่ามันแปลว่าป้าทำอร่อย)',

    'Fun fact: การหักล้างกันของสสาร 1 กรัมและปฏิสสาร 1 กรัม จะให้พลังงานถึง 1.8×10<sup>14</sup>&emsp;  จูล ซึ่งเทียบเท่ากับพลังงานจากระเบิด TNT 43 กิโลตัน',
    'ข่าวด่วน : พบแมวหาดใหญ่ที่ประกาศหายไปกว่า 1 เดือนที่กรุงเทพฯ จากการสัมภาษณ์แมว แมวบอก ที่นี่ที่ไหนนิ',

    '"ใครมันเขียนข่าวแต่ละอันวะ โคตรกัง" -ความคิดในใจของคนอ่านสักคนนึง',

    'น่าน',
    'ฮั่นแน่'
];

function shuffle(array) {
    var i = array.length, j = 0, temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
var bag = shuffle(news);
var index = 0;
function randNews() {
    index++;
    if (index >= bag.length) {
        bag = shuffle(news);
        index = 0;
    }
    return bag[index];
}
var newsticker = document.getElementById('newsticker');
var newstickerBg = document.getElementById('newstickerBg');

newsticker.innerHTML = ' ';
var width = newsticker.offsetWidth;
var pos = newstickerBg.offsetWidth;
// distance = pos + width + 200

function showNews() {
    newsticker.innerHTML = randNews();
    width = newsticker.offsetWidth;
    pos = newstickerBg.offsetWidth;
    newsticker.animate([
        { transform: `translateX(${pos + 150}px)`},
        { transform: `translateX(${-width - 150}px)`}
    ],  {
            duration: (pos + width + 300) * 9 + 100
        }
    );
    setTimeout(showNews, (pos + width + 300) * 9);
}
setTimeout(showNews, 1);    // oversafety