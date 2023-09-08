function openTab(e, tab) {
    var tabcontent = document.getElementsByClassName('tabcontent');
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    var tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tab).style.display = 'block';

    if (tutorial == 3 && tab == 'tabMp') {
        tutorial = 4;
        document.getElementById('buttonMp').style.animation = 'none';
    }
    // e.currentTarget.className += ' active';
}

openTab(null, 'tabIm')
// openTab(null, 'tabMp')