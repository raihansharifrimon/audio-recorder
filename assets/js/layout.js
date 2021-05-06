const togglerBtn = document.querySelector('#togglerBtn');
const leftSiderBar = document.querySelector('.left_sidebar');

togglerBtn.addEventListener('click', () => {
    leftSiderBar.classList.toggle('active_menu');
    console.log('button click');
});
