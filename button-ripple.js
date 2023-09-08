// source: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    //circle.style.position = 'relative';
    //circle.style.overflow = 'hidden'
    circle.style.pointerEvents = 'none';
    
    if (event.clientX == 0 && event.clientY == 0) {
        circle.style.left = `${0}px`;
        circle.style.top = `${button.clientHeight / 2 - radius}px`;
    }
    else {
        // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        // circle.style.top = `${event.clientY - button.offsetTop - radius + document.documentElement.scrollTop}px`;
        circle.style.left = `${event.offsetX - radius}px`;
        circle.style.top = `${event.offsetY - radius}px`;
    }
    circle.classList.add('ripple');
    // let arr = button.getElementsByClassName('ripple');
    // console.log(arr);
    // const ripple = arr[arr.length - 1];
    setTimeout(function() {
        // ripple.remove();
        circle.remove();
    }, 1000);

    // one ripple at a time
    // if (ripple) {
    //     ripple.remove();
    // }

    button.appendChild(circle);
}