const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar ul li a');

hamburgerMenu.addEventListener('click', () => {
    console.log("troca");
    navbar.classList.toggle('open'); // alterna entre aberto e fechado;
});

    // fecha o menu ao clicar em algum dos botões
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open'); 
    });
});