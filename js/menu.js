export function iniciarMenu() {
    const botaoMenu = document.querySelector('.menu-hamburguer');
    const navPrincipal = document.querySelector('#menu-navegacao');
    const linksMenu = document.querySelectorAll('.menu a:not(.dropdown-toggle)');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (botaoMenu && navPrincipal) {
        botaoMenu.addEventListener('click', () => {
            const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';

            botaoMenu.setAttribute('aria-expanded', String(!aberto));
            navPrincipal.classList.toggle('menu-aberto', !aberto);
        });

        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    botaoMenu.setAttribute('aria-expanded', 'false');
                    navPrincipal.classList.remove('menu-aberto');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                botaoMenu.setAttribute('aria-expanded', 'false');
                navPrincipal.classList.remove('menu-aberto');
            }
        });
    }

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
                e.preventDefault();

                const expandido =
                    toggle.getAttribute('aria-expanded') === 'true';

                toggle.setAttribute(
                    'aria-expanded',
                    String(!expandido)
                );

                const submenu = toggle.nextElementSibling;

                if (submenu) {
                    submenu.classList.toggle(
                        'dropdown-visivel',
                        !expandido
                    );
                }
            }
        });
    });
}
