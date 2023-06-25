var news = [
    'ทดสอบ 10<sup>10</sup> กขคง----------------------------',
    'ทดสอบ 10<sup>20</sup> กขคง----------------------------',
    'ทดสอบ 10<sup>30</sup> กขคง----------------------------',
    'ทดสอบ 10<sup>40</sup> กขคง----------------------------ทดสอบ 10<sup>40</sup> กขคง----------------------------'
];

var index = Math.floor(Math.random() * news.length);
var previous = 0;
function randNews() {
    previous = index;
    while (index == previous) {
        index = Math.floor(Math.random() * news.length);
    }
    return news[index];
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
            duration: (pos + width + 300) * 10 + 100
        }
    );
    setTimeout(showNews, (pos + width + 300) * 10);
}
setTimeout(showNews, 1);    // oversafety