// header flexible 적용
const menuOpen = document.querySelector('.menu_open');
const menuClose = document.querySelector('.menu_close');
const nav = document.querySelector('header nav');
const header = document.querySelector('header');

window.addEventListener('resize', () => {
    if(header.offsetWidth > 1190) {
        menuOpen.style.display = 'none';
        menuClose.style.display = 'none';
        if (nav.classList.contains('closing')) nav.classList.remove('closing');
        if (nav.classList.contains('active')) nav.classList.remove('active');
    }
    else if(header.offsetWidth <= 1190 && menuClose.style.display === 'none'){
        menuOpen.style.display = 'unset';
    }
});

menuOpen.addEventListener('click', () => {
    menuOpen.style.display = 'none';
    menuClose.style.display = 'unset';
    if (nav.classList.contains('closing')) nav.classList.remove('closing');

    nav.classList.add('active');
});
menuClose.addEventListener('click', () => {
    nav.classList.add('closing');
    setTimeout(() => {
        nav.classList.remove('active');
        menuOpen.style.display = 'unset';
        menuClose.style.display = 'none';
    }, 500);
});