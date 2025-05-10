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

let hasAnimated = false; // Variável de controle para evitar múltiplas animações

function animateNumbers() {
    const recyclingStat = document.getElementById('recycling-stat');
    const pollutionStat = document.getElementById('pollution-stat');

    let recyclingValue = 0;
    let pollutionValue = 100;

    const interval = setInterval(() => {
        if (recyclingValue < 75) {
            recyclingValue++;
            recyclingStat.textContent = recyclingValue;
        }

        if (pollutionValue > 25) {
            pollutionValue--;
            pollutionStat.textContent = pollutionValue;
        }

        if (recyclingValue === 75 && pollutionValue === 25) {
            clearInterval(interval);
        }
    }, 80); // Ajuste o tempo para controlar a velocidade da animação
}

// Ativa a animação quando a seção #recycle estiver visível
document.addEventListener('scroll', () => {
    const recycleSection = document.querySelector('#recycle');
    const sectionPosition = recycleSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !hasAnimated) {
        hasAnimated = true; // Marca a animação como já executada
        animateNumbers();
    }
});