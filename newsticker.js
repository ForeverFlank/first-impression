var news = [
    'ทดสอบ 10<sup>10</sup>',
    'ทดสอบ 10<sup>20</sup>',
    'ทดสอบ 10<sup>30</sup>',
    'ทดสอบ 10<sup>40</sup>'
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

var scroll = (id) => document.getElementById(id).animate(
    [
        { transform: `translateX(${pos + width + 100}px)`},
        { transform: `translateX(${-width - 100}px)`}
    ],  {
      duration: 1600 + pos * 10
    }
);

setInterval(function() {
    scroll('newsticker');
    newsticker.style.left = `${-width - 100}px`;
    newsticker.innerHTML = randNews();
    width = newsticker.offsetWidth;
    pos = newstickerBg.offsetWidth;
}, 1600 + pos * 10 + 1000);

// scroll('newsticker');
/*
setInterval(function() {
    if (pos + width + 400 >= 0) {
        newsticker.style.left = pos + 'px';
        pos -= 1;
    }
    else {
        newsticker.innerHTML = randNews();
        width = newsticker.offsetWidth;
        pos = newstickerBg.offsetWidth;
        newsticker.style.left = pos + 'px';
    }
}, 10);
*/