import { salvarCadastro } from './storage.js';

function obterApp() {
    return document.querySelector('#app');
}
let timerToast = null;

function exibirToast(msg) {
    const toast = document.getElementById('toast-notificacao');
    if (!toast) return;

    const elMsg = toast.querySelector('.toast-mensagem');
    if (elMsg && msg) {
        elMsg.textContent = msg;
    }

    toast.removeAttribute('hidden');

    requestAnimationFrame(() => {
        toast.classList.add('toast-visivel');
    });

    if (timerToast) {
        clearTimeout(timerToast);
    }

    timerToast = setTimeout(fecharToast, 5000);
}

function fecharToast() {
    const toast = document.getElementById('toast-notificacao');
    if (!toast) return;

    toast.classList.remove('toast-visivel');

    setTimeout(() => {
        toast.setAttribute('hidden', '');
    }, 300);
}

export function validarTelefone(input) {
    if (!input) return;

    const digitos = input.value.replace(/\D/g, '');

    if (digitos.length === 0) {
        input.setCustomValidity('');
    } else if (digitos.length < 11) {
        input.setCustomValidity('O telefone deve ter exatamente 11 dígitos com DDD (ex: (00) 00000-0000).');
    } else {
        input.setCustomValidity('');
    }
}

export function aplicarMascaraTelefone(input) {
    if (!input) return;

    const valorAntes = input.value;
    const posicaoCursor = input.selectionEnd;
    const digitosAntesCursor = valorAntes.slice(0, posicaoCursor).replace(/\D/g, '').length;

    let digitos = valorAntes.replace(/\D/g, '');
    if (digitos.length === 13 && digitos.startsWith('55')) {
        digitos = digitos.slice(2);
    }
    digitos = digitos.slice(0, 11);

    let formatado = '';
    if (digitos.length === 0) {
        formatado = '';
    } else if (digitos.length <= 2) {
        formatado = `(${digitos}`;
    } else if (digitos.length < 11) {
        formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    } else {
        formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7, 11)}`;
    }

    input.value = formatado;

    if (posicaoCursor !== null) {
        if (posicaoCursor === valorAntes.length) {
            input.setSelectionRange(formatado.length, formatado.length);
        } else {
            let novoCursor = formatado.length;
            let digitosContados = 0;
            for (let i = 0; i < formatado.length; i++) {
                if (/\d/.test(formatado[i])) {
                    digitosContados++;
                }
                if (digitosContados === digitosAntesCursor) {
                    novoCursor = i + 1;
                    break;
                }
            }
            if (digitosAntesCursor === 0) {
                novoCursor = formatado.length > 0 && formatado.startsWith('(') && posicaoCursor > 0 ? 1 : 0;
            }
            input.setSelectionRange(novoCursor, novoCursor);
        }
    }

    validarTelefone(input);
}

export function templateInicio() {
    return `
        <section class="hero" aria-labelledby="titulo">
            <div>
                <p class="etiqueta">TERCEIRO SETOR • IMPACTO SOCIAL</p>
                <h1 id="titulo">Pessoas unidas para transformar comunidades.</h1>
                <p class="descricao">
                    A Rede Solidária aproxima voluntários, doadores e
                    projetos sociais, tornando mais simples encontrar
                    formas de contribuir com iniciativas que promovem
                    inclusão e cidadania.
                </p>
                <div class="acoes-hero">
                    <a class="botao" href="/cadastro" data-rota="/cadastro">Quero ser voluntário</a>
                    <a class="botao secundario" href="#apoie" data-abrir-modal="modal-apoio">Quero apoiar</a>
                </div>
            </div>
            <aside class="painel-impacto" aria-label="Indicadores sociais">
                <div><strong>128</strong><span>voluntários ativos</span></div>
                <div><strong>14</strong><span>projetos em andamento</span></div>
                <div><strong>2.400+</strong><span>pessoas alcançadas</span></div>
            </aside>
        </section>

        <section id="projetos" class="secao" aria-labelledby="titulo-projetos">
            <p class="etiqueta">NOSSAS FRENTES</p>
            <h2 id="titulo-projetos">Onde a solidariedade ganha forma</h2>
            <div class="cards">
                <article class="card">
                    <span class="badge badge-educacao">Educação</span>
                    <h3>Educação</h3>
                    <p>Oficinas e atividades que ampliam oportunidades de aprendizagem.</p>
                </article>
                <article class="card">
                    <span class="badge badge-inclusao">Inclusão</span>
                    <h3>Inclusão</h3>
                    <p>Ações comunitárias voltadas à cidadania e à participação social.</p>
                </article>
                <article class="card">
                    <span class="badge badge-doacoes">Doações</span>
                    <h3>Doações</h3>
                    <p>Campanhas para direcionar recursos e itens às famílias atendidas.</p>
                </article>
            </div>
        </section>

        <section id="apoie" class="chamada" aria-labelledby="titulo-apoie">
            <div>
                <p class="etiqueta">FAÇA PARTE</p>
                <h2 id="titulo-apoie">Seu tempo também pode ser uma forma de doação.</h2>
                <p>Cadastre seu interesse e encontre uma oportunidade compatível com suas habilidades e disponibilidade.</p>
            </div>
            <a class="botao" href="/cadastro" data-rota="/cadastro">Cadastrar interesse</a>
        </section>
    `;
}


export function templateCadastro() {
    return `
        <section class="formulario-area" aria-labelledby="titulo-cadastro">
            <div class="cabecalho-formulario">
                <p class="etiqueta">PARTICIPE DA REDE</p>
                <h1 id="titulo-cadastro">Cadastro de voluntário</h1>
                <p>Informe seus dados e interesses para identificarmos oportunidades de participação.</p>
            </div>

            <form class="formulario" action="#" method="post">
                <fieldset>
                    <legend>Dados pessoais</legend>
                    <div class="grade-campos">
                        <div class="campo">
                            <label for="nome">Nome completo *</label>
                            <input type="text" id="nome" name="nome" autocomplete="name" required>
                        </div>
                        <div class="campo">
                            <label for="email">E-mail *</label>
                            <input type="email" id="email" name="email" autocomplete="email" required>
                        </div>
                        <div class="campo">
                            <label for="nascimento">Data de nascimento</label>
                            <input type="date" id="nascimento" name="nascimento" autocomplete="bday">
                        </div>
                        <div class="campo">
                            <label for="cpf">CPF *</label>
                            <input type="text" id="cpf" name="cpf" inputmode="numeric" placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}|[0-9]{11}" title="Use o formato 000.000.000-00" required>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Contato e localização</legend>
                    <div class="grade-campos">
                        <div class="campo">
                            <label for="telefone">Telefone *</label>
                            <input type="tel" id="telefone" name="telefone" autocomplete="tel" inputmode="tel" placeholder="(00) 00000-0000" pattern="\\([0-9]{2}\\)\\s?[0-9]{5}-[0-9]{4}|[0-9]{11}" title="Digite os 11 dígitos com DDD no formato (00) 00000-0000" maxlength="15" required>
                        </div>
                        <div class="campo">
                            <label for="cep">CEP *</label>
                            <input type="text" id="cep" name="cep" autocomplete="postal-code" inputmode="numeric" placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}" title="Use o formato 00000-000" required>
                        </div>
                        <div class="campo campo-largo">
                            <label for="endereco">Endereço *</label>
                            <input type="text" id="endereco" name="endereco" autocomplete="address-line1" required>
                        </div>
                        <div class="campo">
                            <label for="cidade">Cidade *</label>
                            <input type="text" id="cidade" name="cidade" autocomplete="address-level2" required>
                        </div>
                        <div class="campo">
                            <label for="estado">Estado *</label>
                            <select id="estado" name="estado" autocomplete="address-level1" required>
                                <option value="">Selecione</option>
                                <option>MS</option>
                                <option>MT</option>
                                <option>SP</option>
                                <option>PR</option>
                                <option>RJ</option>
                                <option>Outro estado</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Interesse em voluntariado</legend>
                    <div class="grade-campos">
                        <div class="campo">
                            <label for="area">Área de interesse *</label>
                            <select id="area" name="area" required>
                                <option value="">Selecione</option>
                                <option>Educação</option>
                                <option>Inclusão social</option>
                                <option>Campanhas e arrecadações</option>
                                <option>Comunicação</option>
                                <option>Eventos comunitários</option>
                            </select>
                        </div>
                        <div class="campo">
                            <label for="disponibilidade">Disponibilidade *</label>
                            <select id="disponibilidade" name="disponibilidade" required>
                                <option value="">Selecione</option>
                                <option>Durante a semana</option>
                                <option>Finais de semana</option>
                                <option>Horários flexíveis</option>
                            </select>
                        </div>
                        <div class="campo campo-largo">
                            <label for="mensagem">Como você gostaria de contribuir?</label>
                            <textarea id="mensagem" name="mensagem" rows="5" placeholder="Conte sobre suas habilidades, experiências ou motivação."></textarea>
                        </div>
                    </div>
                </fieldset>

                <div class="acoes">
                    <button class="botao secundario" type="reset">Limpar</button>
                    <button class="botao" type="submit">Enviar cadastro</button>
                </div>
            </form>
        </section>
    `;
}

export function templateProjetos() {
    return `
        <section class="secao">
            <p class="etiqueta">NOSSAS FRENTES</p>
            <h1>Projetos</h1>
            <div class="cards">
                <article class="card">
                    <span class="badge badge-educacao">Educação</span>
                    <h3>Educação</h3>
                    <p>Oficinas e atividades que ampliam oportunidades de aprendizagem.</p>
                </article>
                <article class="card">
                    <span class="badge badge-inclusao">Inclusão</span>
                    <h3>Inclusão</h3>
                    <p>Ações comunitárias voltadas à cidadania e participação social.</p>
                </article>
                <article class="card">
                    <span class="badge badge-doacoes">Doações</span>
                    <h3>Doações</h3>
                    <p>Campanhas para direcionar recursos às famílias atendidas.</p>
                </article>
            </div>
        </section>
    `;
}

export function renderizar(rota) {
    const app = obterApp();
    if (!app) return;

    app.innerHTML = '';

    if (rota === '/' || rota === '/index.html') {
        app.innerHTML = templateInicio();
        return;
    }

    if (rota === '/cadastro' || rota === '/cadastro.html') {
        app.innerHTML = templateCadastro();
        return;
    }

    if (rota === '/projetos') {
        app.innerHTML = templateProjetos();
        return;
    }

    app.innerHTML = `
        <section class="secao">
            <h1>Página não encontrada</h1>
            <p>O conteúdo solicitado não foi encontrado.</p>
        </section>
    `;
}


export function iniciarSPA() {
    document.addEventListener('click', e => {
        const link = e.target.closest('[data-rota]');
        if (!link) return;

        e.preventDefault();
        const rota = link.getAttribute('data-rota');
        history.pushState({}, '', rota);
        renderizar(rota);
    });

    window.addEventListener('popstate', () => {
        renderizar(window.location.pathname);
    });

    document.addEventListener('input', e => {
        if (e.target && e.target.id === 'telefone') {
            aplicarMascaraTelefone(e.target);
        }
    });

    document.addEventListener('blur', e => {
        if (e.target && e.target.id === 'telefone') {
            validarTelefone(e.target);
        }
    }, true);

    document.addEventListener('reset', e => {
        const formulario = e.target.closest('.formulario');
        if (!formulario) return;

        const campoTelefone = formulario.querySelector('#telefone');
        if (campoTelefone) {
            campoTelefone.setCustomValidity('');
        }

        const alertaSucesso = document.getElementById('alerta-sucesso');
        if (alertaSucesso) {
            alertaSucesso.setAttribute('hidden', '');
        }
    });

    document.addEventListener('submit', e => {
        const formulario = e.target.closest('.formulario');
        if (!formulario) return;

        e.preventDefault();

        const campoTelefone = formulario.querySelector('#telefone');
        if (campoTelefone) {
            validarTelefone(campoTelefone);
        }

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        salvarCadastro(formulario);

        const alertaSucesso = document.getElementById('alerta-sucesso');
        if (alertaSucesso) {
            alertaSucesso.removeAttribute('hidden');
        }

        exibirToast('Cadastro salvo com sucesso!');
        formulario.reset();
    });

    const btnFecharToast = document.querySelector('[data-fechar-toast]');
    if (btnFecharToast) {
        btnFecharToast.addEventListener('click', fecharToast);
    }

    const alerta = document.querySelector('.alerta-solidaria');
    const fecharAlerta = document.querySelector('.alerta-fechar');
    if (alerta && fecharAlerta) {
        fecharAlerta.addEventListener('click', () => {
            alerta.hidden = true;
        });
    }

    const app = obterApp();
    if (app) {
        renderizar(window.location.pathname);
    }

    const campoTelefoneInicial = document.querySelector('#telefone');
    if (campoTelefoneInicial && campoTelefoneInicial.value) {
        aplicarMascaraTelefone(campoTelefoneInicial);
    }
}

