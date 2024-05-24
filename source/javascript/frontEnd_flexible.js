// header flexible 적용
const menuOpen = document.querySelector('.menu_open');
const menuClose = document.querySelector('.menu_close');
const nav = document.querySelector('header nav');

menuOpen.addEventListener('click', () => {
    menuOpen.style.display = 'none';
    menuClose.style.display = 'unset';
    if(nav.classList.contains('closing')) nav.classList.remove('closing');;
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