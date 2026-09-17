const CHAVE_CADASTROS = 'redeSolidariaCadastros';

export function salvarCadastro(formulario) {
    const dados = Object.fromEntries(
        new FormData(formulario).entries()
    );

    const cadastrosSalvos = carregarCadastros();

    cadastrosSalvos.push({
        ...dados,
        dataCadastro: new Date().toISOString()
    });

    localStorage.setItem(
        CHAVE_CADASTROS,
        JSON.stringify(cadastrosSalvos)
    );

    return dados;
}

export function carregarCadastros() {
    const dados = localStorage.getItem(CHAVE_CADASTROS);

    if (!dados) {
        return [];
    }

    try {
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}
