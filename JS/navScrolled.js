export function scroll() {
    // navbar scrolled - transparent to solid on scroll
    const navE1 = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navE1.classList.add('nav-scrolled');
        } else if (window.scrollY <= 50) {
            navE1.classList.remove('nav-scrolled');
        }
    });
}

