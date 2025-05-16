const hamburgerMenu = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar ul li a');

hamburgerMenu.addEventListener('click', () => {
    navbar.classList.toggle('open');
    navbar.classList.toggle('close');
});

    // fecha o menu ao clicar em algum dos botões
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open'); 
        navbar.classList.add('close');
    });
});

let hasAnimated = false; // Variável de controle para evitar múltiplas animações

function animateNumbers() {
    const recyclingStat = document.getElementById('recycling-stat');
    const pollutionStat = document.getElementById('pollution-stat');

    let recyclingValue = 0;
    let pollutionValue = 100;

    const interval = setInterval(() => {

        if (recyclingValue < 63) {

            recyclingValue++;
            recyclingStat.textContent = recyclingValue;
        }


        if (pollutionValue > 37) {
            pollutionValue--;
            pollutionStat.textContent = pollutionValue;
        }


        if (recyclingValue === 63 && pollutionValue === 37) {

            clearInterval(interval);
        }
    }, 80); // Ajuste o tempo para controlar a velocidade da animação
}

// // Ativa a animação quando a seção #recycle estiver visível
// document.addEventListener('scroll', () => {
//     const recycleSection = document.querySelector('#recycle');
//     const sectionPosition = recycleSection.getBoundingClientRect().top;
//     const screenPosition = window.innerHeight / 1.3;

//     if (sectionPosition < screenPosition && !hasAnimated) {
//         hasAnimated = true; // Marca a animação como já executada
//         animateNumbers();
//     }
// });

const carousel = document.getElementById('recycle-slider');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 435, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -435, behavior: 'smooth' });
});
