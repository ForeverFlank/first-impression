'use strict';

var news = [
    'สวัสดี',

    'อะไรเอ่ยใหญ่กว่าจักรวาล? เฉลย จักรวาลชุบแป้งทอด',
    'ทำไมต้องเปิดตู้เสื้อผ้าเบา ๆ ? เฉลย เพราะมีชุดนอนอยู่',
    'จังหวัดอะไรตลกที่สุด? เฉลย จังหวัดประจวบ คิกคิก ขำ',

    'เพื่อนอะไรบอกฝันดีก่อนนอน',
    'ไก่ที่หมดจานก็คือการที่กินไก่ ส่วนไก่ที่ไม่มีจานก็คือการที่ไม่มีไก่',
    'ที่เธอกด like เธอไม่ได้มีใจแต่เธอมีเน็ต',
    'ไม่อยากเป็นไข้ที่ชน',
    'คนอะไรไม่รู้ยิ่งโตยิ่งดูน่ารัก',
    'ใครเพื่อนแก',
    'ถ้าเขาจะรัก ยืนเฉย ๆ เขาก็รัก',
    'เธอคือทองแดงและเทลลูเรียมใช่ไหม ทำไมเธอถึง CuTe จัง (เคมี rizz)',
    'เธอคือหลุมดำใช่ไหม เพราะทำไมตอนอยู่กับเธอเวลาถึงช้าลง (Astronomy rizz)',
    'เธอกับเราก็เหมือนกับเส้นขนาน ได้แค่อยู่ห่าง ๆ ไม่ได้มีวันเจอกัน (คณิต rizz)',
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup>&ensp; ปี',
    'รักนะ 10<sup>3000</sup>',
    '128√e980',

    'ยายมีขายหอยยายมอยขายหมีขนหมีของยายมอยติดอยู่บนหอยของยายมี',
    'เช้าฟาดผัดฟัก เย็นฟาดฟักผัด',
    'ผมที่กำลังวิ่งหนีป้าขายตามสั่งคนนึงที่เป็นคนใต้หลังจากที่ผมบอกป้าว่า "หรอยจังนะป้า" (ผมคิดว่ามันแปลว่าป้าทำอร่อย)',
    'ใครคือสมชายและทำไมเขาถึงซื้อกล้วยมา 5×10<sup>69</sup> ลูก',
    'สวัสดีฮ้าฟฟู่วววววว',
    'ปับ ปาดับ ปับ ปับ ปะ เยเย',
    'ก',
    'ข้อความนี้เป็นเท็จ',
    '@&nbsp;·&nbsp;·&nbsp;·&ensp;·&emsp;&emsp;O&emsp;&emsp;&emsp;∅&emsp;&emsp;&emsp;&emsp;o&emsp;&emsp;&emsp;&emsp;o&emsp;&emsp;&emsp;&emsp;·',
    'สาธุ10<sup>99</sup>',
    
    'Fun fact: การหักล้างกันของสสาร 1 กรัมและปฏิสสาร 1 กรัม จะให้พลังงานถึง 1.8×10<sup>14</sup>&emsp;  จูล ซึ่งเทียบเท่ากับพลังงานจากระเบิด TNT 43 กิโลตัน',
    'Fun fact: 1 อสงไขยมีค่าเท่ากับ 10<sup>140</sup>',

    '.&emsp;。&emsp;.&emsp;ඞ&emsp;.&emsp;,&emsp;&emsp;.&emsp;Red was An impostor.&emsp;1 Impostor remain',

    '"ใครมันเขียนข่าวแต่ละอันวะ โคตรกัง" -ความคิดในใจของคนอ่านสักคนนึง',
    '"หัวใจมี 4 ห้อง ไม่ได้แปลว่าเราต้องมีคนในใจ 4 คน" -Anonymous',

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