var news = [
    'สวัสดี',

    'อะไรเอ่ยใหญ่กว่าจักรวาล? เฉลย จักรวาลชุบแป้งทอด',
    'ทำไมต้องเปิดตู้เสื้อผ้าเบา ๆ ? เฉลย เพราะมีชุดนอนอยู่',
    'จังหวัดอะไรตลกที่สุด? เฉลย จังหวัดประจวบ คิกคิก ขำ',
    'คนไทยไม่ชอบปลาอะไร? เฉลย ปลายุ[ข้อความนี้ถูกปิดกั้นการมองเห็นโดยราชอาณาจักรไทย]',

    'เพื่อนอะไรบอกฝันดีก่อนนอน',
    'ไก่ที่หมดจานก็เหมือนกับการที่หมดใจ ส่วนไก่ที่ไม่มีจานก็เหมือนกับการที่ไม่มีใจ',
    'ที่เธอกด like เธอไม่ได้มีใจแต่เธอมีเน็ต',
    'ไก่ที่หมดจานก็เหมือนกับการที่กินไก่',
    'ไม่อยากเป็นไข้ที่ชน',
    'คนอะไรไม่รู้ยิ่งโตยิ่งดูน่ารัก',
    'ใครเพื่อนแก',
    'เธอคือทองแดงและเทลลูเรียมใช่ไหม ทำไมเธอถึง CuTe จัง (เคมี rizz)',
    'เธอคือหลุมดำใช่ไหม เพราะทำไมตอนอยู่กับเธอเวลาถึงช้าลง (วิทย์ rizz)',
    '"เธอกับเราก็เหมือนกับเส้นขนาน ได้แค่อยู่ห่าง ๆ ไม่ได้มีวันเจอกัน (คณิต rizz)" "แต่ถ้าเราอาศัยอยู่ใน spherical geometry ล่ะ" "เออว่ะ จริงด้วย ไม่ได้คิดไว้แฮะ"',
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup>&ensp; ปี',
    'รักนะ 10<sup>3000</sup>',

    'ยายมีขายหอยยายมอยขายหมีขนหมีของยายมอยติดอยู่บนหอยของยายมี',
    'ผมที่กำลังวิ่งหนีป้าขายตามสั่งคนนึงที่เป็นคนใต้หลังจากที่ผมบอกป้าว่า "หรอยจังนะป้า" (ผมคิดว่ามันแปลว่าป้าทำอร่อย)',
    'ใครคือสมชายและทำไมเขาถึงซื้อกล้วยมา 5×10<sup>69</sup>&emsp;  ลูก',
    'สวัสดีฮ้าฟฟู่วววววว',
    'ก',
    
    'Fun fact: การหักล้างกันของสสาร 1 กรัมและปฏิสสาร 1 กรัม จะให้พลังงานถึง 1.8×10<sup>14</sup>&emsp;  จูล ซึ่งเทียบเท่ากับพลังงานจากระเบิด TNT 43 กิโลตัน',
    'ข่าวด่วน: พบแมวหาดใหญ่ที่ประกาศหายไปกว่า 1 เดือนที่กรุงเทพฯ จากการสัมภาษณ์แมว แมวบอก ที่นี่ที่ไหนนิ',

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
            duration: (pos + width + 240) * 9 + 100
        }
    );
    setTimeout(showNews, (pos + width + 240) * 9);
}
setTimeout(showNews, 1);    // oversafety