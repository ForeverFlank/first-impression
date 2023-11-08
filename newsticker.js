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
    'มันเป็นใคร',
    'ถ้าเขาจะรัก ยืนเฉย ๆ เขาก็รัก',
    'เธอคือทองแดงและเทลลูเรียมใช่ไหม ทำไมเธอถึง CuTe จัง (เคมี rizz)',
    'เธอคือหลุมดำใช่ไหม เพราะทำไมตอนอยู่กับเธอเวลาถึงช้าลง (Astronomy rizz)',
    'เธอกับเราก็เหมือนกับเส้นขนาน ได้แค่อยู่ห่าง ๆ ไม่ได้มีวันเจอกัน (คณิต rizz)',
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup> ปี',
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
    'Impressive!',
    'สู้ ๆ !',
    'ทดสอบการอ่าน: ฝนตกปรอยกรกนกคนตลกชวนดวงกมลคนผอมรอชมภมรดมดอมดอกขจรสองคนชอบจอดรถตรงตรอกยอมทนอดนอนอดกรนรอยลภมรดมดอกหอมบนขอนตรงคลองมอญลมบนหวนสอบจนปรอยผมปรกคอสองสมรสมพรคนจรพบสองอรชรสมพรปองสองสมรยอมลงคลองลอยคอมองสองอรชรมองอกมองคอมองผมมองจนสองคนฉงนสมพรบอกชวนสองคนถอนสมอลงชลลองสองหนสองอรชรถอยหลบสมพรวอนจนพลพรรคสดสวยหมดสนกรกนกชวนดวงกมลชงนมผงรอชมภมรบนดอนตรงจอมปลวก',
    'ถ้าหากเราสงสัยว่า ทำไม i × i ถึงมีค่าเท่ากับ -1 ให้เราลองจินตนาการว่าเรามีเพื่อนอยู่ i คน นั่นคือเราไม่ได้มีเพื่อนจริง ๆ แต่เป็นเพื่อนในจินตนาการ และเพื่อนคนนั้นก็ให้เงินเรา i บาท คุณจะมีเงินกี่บาท? คำตอบคือ -1 มันฟังดูไม่มีเหตุผลเลยใช่ไหมล่ะ แต่จริง ๆ แล้ว เราพอจะหาเหตุผลที่จะมา support คำตอบนี้ได้นะ เพราะเหตุผลที่แท้จริงนั้นคือ เรากำลังเมากาวอยู่ เพื่อนคนนั้นไม่ใช่เพื่อนในจินตนาการอะไรหรอก เขาคือคนแปลกหน้าต่างหาก และเขาก็ไม่ได้ให้เงินเราด้วย เราต่างหากที่ไปขโมยเงินเขา เราจึงติดเงินเขาอยู่ 1 บาท นั่นแหละคือเหตุผลที่ว่า ทำไม i × i ถึงมีค่าเท่ากับ -1',
    
    'Fun fact: การหักล้างกันของสสาร 1 กรัมและปฏิสสาร 1 กรัม จะให้พลังงานถึง 1.8×10<sup>14</sup> จูล ซึ่งเทียบเท่ากับพลังงานจากระเบิด TNT 43 กิโลตัน',
    'Fun fact: 1 อสงไขยมีค่าเท่ากับ 10<sup>140</sup>',
    'Fun fact: 10<sup>100</sup> = 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000',
    
    'รู้หมือไร่ ความจริงแล้วกบสามารถกระโดดได้สูงกว่าหอไอเฟล นั่นก็เป็นเพราะว่า หอไอเฟลกระโดดไม่ได้',

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
            duration: (pos + width + 240) * 10 + 100
        }
    );
    setTimeout(showNews, (pos + width + 240) * 10);
}
setTimeout(showNews, 1);    // oversafety