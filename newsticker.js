'use strict';

var news = [
    'สวัสดี',

    'Feels stuck? Keep playing. Trust the process.',
    'เกมนี้มีระบบที่คำนวณ progress ตอน offline ดังนั้นถ้าจะ afk นาน ๆ ปิดเกมนี้ได้เลย ไม่ต้องกลัวว่าปิดเกมแล้วจะหาย (ถ้าระบบมันไม่ bug อะนะ)',

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
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup> ปี',
    'รักนะ 10<sup>3000</sup>',
    '128√e980',
    'เธอดูดีที่สุดเลยเว้ยแก',
    'อยากเป็นฟีลด์แต่เราคงเป็นกันได้แค่ริง😔😔😔',
    '🤨🤨🤨',
    'ใครอ่านข้อความนี้ขอให้เป็นคนที่เธอไว้ใจ มันก็ดีเท่าไหร่',

    'ยายมีขายหอยยายมอยขายหมีขนหมีของยายมอยติดอยู่บนหอยของยายมี',
    'เช้าฟาดผัดฟัก เย็นฟาดฟักผัด',
    'ผมที่กำลังวิ่งหนีป้าขายตามสั่งคนนึงที่เป็นคนใต้หลังจากที่ผมบอกป้าว่า "หรอยจังนะป้า" (ผมคิดว่ามันแปลว่าป้าทำอร่อย)',
    'ใครคือสมชายและทำไมเขาถึงซื้อกล้วยมา 5×10<sup>69</sup> ลูก',
    'สวัสดีฮ้าฟฟู่วววววว',
    'ปับ ปาดับ ปับ ปับ ปะ เยเย',
    'ก',
    'ข้อความนี้เป็นเท็จ',
    'จงหาความเป็นไปได้ที่จะตอบข้อนี้ถูก  ก. 0%  ข. 25%  ค. 25%  ง. 50%',
    '@&nbsp;·&nbsp;·&nbsp;·&ensp;·&emsp;&emsp;O&emsp;&emsp;&emsp;∅&emsp;&emsp;&emsp;&emsp;o&emsp;&emsp;&emsp;&emsp;o&emsp;&emsp;&emsp;&emsp;·',
    'สาธุ10<sup>99</sup>',
    'Impressive!',
    'สู้ ๆ !',
    'ทดสอบการอ่าน: ฝนตกปรอยกรกนกคนตลกชวนดวงกมลคนผอมรอชมภมรดมดอมดอกขจรสองคนชอบจอดรถตรงตรอกยอมทนอดนอนอดกรนรอยลภมรดมดอกหอมบนขอนตรงคลองมอญลมบนหวนสอบจนปรอยผมปรกคอสองสมรสมพรคนจรพบสองอรชรสมพรปองสองสมรยอมลงคลองลอยคอมองสองอรชรมองอกมองคอมองผมมองจนสองคนฉงนสมพรบอกชวนสองคนถอนสมอลงชลลองสองหนสองอรชรถอยหลบสมพรวอนจนพลพรรคสดสวยหมดสนกรกนกชวนดวงกมลชงนมผงรอชมภมรบนดอนตรงจอมปลวก',
    '"Yields falsehood when preceded by its quotation" yields falsehood when preceded by its quotation.',
    'มีนักคณิตศาสตร์จำนวนอนันต์คนเดินเข้าไปบาร์ คนแรกขอเบียร์ 1 แก้ว คนที่ 2 ขอเบียร์ 2 แก้ว คนที่ 3 ขอเบียร์ 3 แก้ว เป็นแบบนี้ไปเรี่อย ๆ บาร์เทนเดอร์ถอนหายใจ แล้วเทเบียร์ลงไปในแก้วให้ตัวเอง 1/12 แก้ว',
    'เมนูวันนี้: ซุปฟีโบนักชี -- ส่วนผสม: 1. ซุปฟีโบนักชีเมื่อวาน 2. ซุปฟีโบนักชีเมื่อ 2 วันที่แล้ว',
    'ง่วง',
    'นอนน้อยแต่นอนนะจ๊ะ',
    'เกมนี้ได้รับแรงบันดาลใจจาก Antimatter Dimensions',
    'Oct 31 = Dec 25&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;(context: oct = ฐานแปด dec = ฐาน 10 -> 31 ฐาน 8 = 25 ฐาน 10)',
    '0.1 + 0.2 = 0.30000000000000004',
    'javascript moment: 2 + "2" == "22" แต่ 2 - "2" == 0',
    'ข่าวประจำวัน: นักวิทยาศาสตร์ค้นพบอนุภาคใหม่ที่เป็นส่วนประกอบของ quark อีกที ทำให้เราต้องเปลี่ยนความเข้าใจต่อจักรวาลแทบทั้งหมด โดยจากงานวิจัยได้เรียกอนุภาคดังกล่าวนี้ว่า subquark ซึ่ง subquark 3 ตัวจะประกอบกันเป็น quark 1 ตัว แต่ละตัวจะมีประจุเป็น 1/9, -1/9, 2/9, -2/9, 4/9, -4/9 ขึ้นอยู่กับชนิดต่อ ๆ ไป ทำให้ความพยายามของเราที่จะเข้าใจจักรวาลนี้ด้วย grand unified theory ต้องถูกมาวางระเบียบใหม่ทั้งหมด (source: ถ้าไม่เชื่อเราแล้วจะเชื่อใคร)',
    'ครับพี่พี่ว่าไงผมก็ว่างั้น',
    'มาทดสอบการกลั้นหายใจกันเถอะ ถ้าเห็นข้อความว่า เริ่ม ให้กลั้นหายใจแล้วนับเลขที่เห็นจนกว่าจะหยุดกลั้นหายใจ เอาละนะ 3... 2... 1... เริ่ม ! 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 โอเค หายใจปกติได้ ได้เลขเท่าไหร่กันบ้างล่ะ',
    'ฟหกด่าสว',
    
    'Fun fact: การหักล้างกันของสสาร 1 กรัมและปฏิสสาร 1 กรัม จะให้พลังงานถึง 1.8×10<sup>14</sup> จูล ซึ่งเทียบเท่ากับพลังงานจากระเบิด TNT 43 กิโลตัน',
    'Fun fact: 1 อสงไขยมีค่าเท่ากับ 10<sup>140</sup>',
    'Fun fact: ชื่อ Google มีที่มาจากเลข googol ที่มีค่าเท่ากับ 10<sup>100</sup> และมีเลขอีกตัวหนึ่งชื่อ googolplex มีค่าเท่ากับ 10<sup>googol</sup> หรือ 10<sup>10<sup>100</sup></sup>',
    
    'รู้หมือไร่ ความจริงแล้วกบสามารถกระโดดได้สูงกว่าหอไอเฟล นั่นก็เป็นเพราะว่า หอไอเฟลกระโดดไม่ได้',
    'รู้หมือไร่ ถ้าเรานำ DNA ทั้งหมดในร่างกายออกมาวางเรียงกันเป็นเส้นตรง เราจะตาย',

    '.&emsp;。&emsp;.&emsp;ඞ&emsp;.&emsp;,&emsp;&emsp;.&emsp;Red was An impostor.&emsp;1 Impostor remain',

    '"ใครมันเขียนข่าวแต่ละอันวะ โคตรกัง" -ความคิดในใจของคนอ่านสักคนนึง',
    '"หัวใจมี 4 ห้อง ไม่ได้แปลว่าเราต้องมีคนในใจ 4 คน" -ForeverFlank',
    '"เลิกเอา quote กัง ๆ มาใส่ชื่อผมได้ใหมขอร้องละ" -อัลเบิร์ต ไอน์สไตน์',

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
            duration: (pos + width + 240) * 10 + 100
        }
    );
    setTimeout(showNews, (pos + width + 240) * 10);
}
setTimeout(showNews, 1);    // oversafety