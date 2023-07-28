var news = [
    'สวัสดี',

    'อะไรเอ่ยใหญ่กว่าจักรวาล? เฉลย จักรวาลชุบแป้งทอด',
    'ทำไมต้องเปิดตู้เสื้อผ้าเบา ๆ ? เฉลย เพราะมีชุดนอนอยู่',
    'จังหวัดอะไรตลกที่สุด? เฉลย จังหวัดประจวบ คิกคิก ขำ',
    'คนไทยไม่ชอบปลาอะไร? เฉลย ปลายุ[ข้อความนี้ถูกปิดกั้นการมองเห็นโดยราชอาณาจักรไทย]',

    'เพื่อนอะไรบอกฝันดีก่อนนอน',
    'ที่เธอกด like เธอไม่ได้มีใจแต่เธอมีเน็ต',
    'ไก่ที่หมดจานก็เหมือนกับการที่กินไก่',
    'ไม่อยากเป็นไข้ที่ชน',
    'คนอะไรไม่รู้ยิ่งโตยิ่งดูน่ารัก',
    'ใครเพื่อนแก',
    'เธอคือทองแดงและเทลลูเรียมใช่ไหม ทำไมเธอถึง CuTe จัง (เคมี rizz)',
    'เธอคือหลุมดำใช่ไหม เพราะทำไมตอนอยู่กับเธอเวลาถึงช้าลง (วิทย์ rizz)',
    `<p style="color:#7ae0ff;">"เธอกับเราก็เหมือนกับเส้นขนาน ได้แค่อยู่ห่าง ๆ ไม่ได้มีวันเจอกัน (คณิต rizz)"</p>
    <p style="color:#ffd675;">"แต่ถ้าเราอาศัยอยู่ใน spherical geometry ล่ะ"</p>
    <p style="color:#7ae0ff;">"ห้ะ อะไรนะ"</p>
    <p style="color:#ffd675;">"ก็คือเรขาคณิตบนทรงกลมไง สมมติว่ามีคน 2 คนอยู่บนโลกบนตำแหน่งละติจูดเดียวกัน แต่ลองจิจูดต่างกัน แล้วให้ทั้งสองคนเดินทางไปในทิศเหนือด้วยความเร็วที่เท่ากัน"</p>
    <p style="color:#7ae0ff;">"อืม"</p>
    <p style="color:#ffd675;">"ทั้งสองคนก็ต้องเจอกันที่ขั้วโลกเหนือใช่ไหมล่ะ"</p>
    <p style="color:#7ae0ff;">"อ๋อ เก็ตแล้ว"</p>
    <p style="color:#ffd675;">"แต่ดูเหมือนว่าเรากับแกจะอยู่บน hyperbolic geometry นะ"</p>
    <p style="color:#7ae0ff;">"อ่าว เศร้าเฉย"</p>`,
    
    '1 สัปดาห์ยาวนานเหมือน 10<sup>7</sup> ปี',
    'รักนะ 10<sup>3000</sup>',
    
    'อยู่ภายในใจเป็นหมื่นล้านคำ',

    'ยายมีขายหอยยายมอยขายหมีขนหมีของยายมอยติดอยู่บนหอยของยายมี',
    'ผมที่กำลังวิ่งหนีป้าขายตามสั่งคนนึงที่เป็นคนใต้หลังจากที่ผมบอกป้าว่า "หรอยจังนะป้า" (ผมคิดว่ามันแปลว่าป้าทำอร่อย)',
    'ใครคือสมชายและทำไมเขาถึงซื้อกล้วยมา 5×10<sup>69</sup> ลูก',
    'สวัสดีฮ้าฟฟู่วววววว',
    'ก',

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