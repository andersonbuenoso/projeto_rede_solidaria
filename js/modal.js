let focoAnterior = null;

export function abrirModal(modal) {
    if (!modal) return;

    focoAnterior = document.activeElement;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    const primeiroFocavel = modal.querySelector('button, [href]');

    if (primeiroFocavel) {
        primeiroFocavel.focus();
    }
}

export function fecharModal(modal) {
    if (!modal) return;

    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    if (focoAnterior) {
        focoAnterior.focus();
    }
}

export function iniciarModal() {
    document.addEventListener('click', e => {
        const botaoAbrir = e.target.closest('[data-abrir-modal]');

        if (botaoAbrir) {
            e.preventDefault();

            const id = botaoAbrir.getAttribute('data-abrir-modal');
            abrirModal(document.getElementById(id));
            return;
        }

        const botaoFechar = e.target.closest('[data-fechar-modal]');

        if (botaoFechar) {
            const modal = botaoFechar.closest('.modal');
            fecharModal(modal);
        }
    });

    document.addEventListener('keydown', e => {
        const modal = document.getElementById('modal-apoio');

        if (
            e.key === 'Escape' &&
            modal &&
            !modal.hasAttribute('hidden')
        ) {
            fecharModal(modal);
        }
    });
}
