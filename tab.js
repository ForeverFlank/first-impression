'use strict';

function openTab(e, tab, bypass=false) {
    let tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++)
        tabcontent[i].style.display = 'none';

    let tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++)
        tablinks[i].className = tablinks[i].className.replace(' active', '');

    let target;
    if (bypass)
        target = document.getElementById('buttonIm');
    else
        target = e.currentTarget;
    target.className += ' active';

    let { left, top, width, height } = target.getBoundingClientRect();
    let currentLeft = document.getElementById('tabIndicator').style.left;
    left = left + width / 2;

    document.getElementById('tabIndicator').animate([
        { left: `${currentLeft}`},
        { left: `calc(${left}px - 1em)`}
    ],  {
            duration: 280,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
        }
    );
    document.getElementById('tabIndicator').style.left = `calc(${left}px - 1em)`

    document.getElementById(tab).style.display = 'block';

    if (tutorial == 3 && tab == 'tabMp') {
        tutorial = 4;
        document.getElementById('buttonMp').style.animation = 'none';
    }
}

openTab(null, 'tabIm', true);
// openTab(null, 'tabFp');

let fpDiv = document.getElementById('fpGrid');
// fpDiv.scrollLeft += (fpDiv.scrollWidth - fpDiv.offsetWidth) / 2;
