document.addEventListener('DOMContentLoaded', () => {
    mostrarEtapa('etapa-tipousuario');
});

function mostrarEtapa(idEtapaParaMostrar) {
    const todasAsEtapas = document.querySelectorAll('.etapa, .etapa-ativa');
    todasAsEtapas.forEach(etapa => {
        etapa.classList.remove('etapa-ativa');
        etapa.classList.add('etapa');
    });

    const etapaAtual = document.getElementById(idEtapaParaMostrar);
    if (etapaAtual) {
        etapaAtual.classList.remove('etapa');
        etapaAtual.classList.add('etapa-ativa');
    }
}

function retornar(etapaAtualId, etapaAnteriorId) {
    limparErrosDaEtapa(etapaAtualId);
    mostrarEtapa(etapaAnteriorId);
}

function confirmarEtapa(etapaAtualId, proximaEtapaId) {
    if (etapaAtualId === 'etapa-tipousuario') {
        mostrarEtapa(proximaEtapaId);
    } else if (validarEtapa(etapaAtualId)) {
        mostrarEtapa(proximaEtapaId);
    }
}

function finalizarCadastro() {
    if (validarEtapa('etapa-conta')) {
        const formData = new FormData();
        const formsColaborador = document.querySelectorAll('#cadastro-colaborador form');
        formsColaborador.forEach(form => {
            const formEntries = new FormData(form);
            for (let pair of formEntries.entries()) {
                formData.append(pair[0], pair[1]);
            }
        });

        // Adiciona o tipo de usuário (implícito como colaborador neste fluxo)
        formData.append('tipoUsuario', 'colaborador');


        console.log('Dados do Cadastro:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        alert('Cadastro finalizado com sucesso! (Verifique o console para os dados)');
    }
}

// --- FUNÇÕES DE VALIDAÇÃO ---

function validarEtapa(idEtapa) {
    limparErrosDaEtapa(idEtapa);
    let formValido = true;

    if (idEtapa === 'etapa-email') {
        const email = document.getElementById('email');
        const confirmarEmail = document.getElementById('confirmarEmail');

        if (!email.value.trim()) {
            mostrarErro(email, 'O campo E-mail é obrigatório.');
            formValido = false;
        } else if (!isValidEmail(email.value.trim())) {
            mostrarErro(email, 'Por favor, insira um e-mail válido.');
            formValido = false;
        }

        if (!confirmarEmail.value.trim()) {
            mostrarErro(confirmarEmail, 'O campo Confirme o E-mail é obrigatório.');
            formValido = false;
        } else if (email.value.trim() !== confirmarEmail.value.trim()) {
            mostrarErro(confirmarEmail, 'Os e-mails não coincidem.');
            formValido = false;
        }
    } else if (idEtapa === 'etapa-pessoal') {
        const nomeCompleto = document.getElementById('nomeCompleto');
        const cpf = document.getElementById('cpf');
        const dataNascimento = document.getElementById('dataNascimento');

        if (!nomeCompleto.value.trim()) {
            mostrarErro(nomeCompleto, 'O campo Nome Completo é obrigatório.');
            formValido = false;
        }

        const cpfInput = document.getElementById('cpf');
        const cpfValue = cpfInput.value.trim();

        if (!cpfValue) {
            mostrarErro(cpfInput, 'O campo CPF é obrigatório.');
            formValido = false;
        } else if (!isValidCPF(cpfValue)) {
            mostrarErro(cpfInput, 'CPF inválido.');
            formValido = false;
        }


        if (!dataNascimento.value) {
            mostrarErro(dataNascimento, 'O campo Data de Nascimento é obrigatório.');
            formValido = false;
        } else {
            const hoje = new Date();
            const dataNasc = new Date(dataNascimento.value);
            // Ajuste para comparar apenas a data, ignorando a hora e fuso horário
            const dataNascUtc = new Date(dataNasc.getUTCFullYear(), dataNasc.getUTCMonth(), dataNasc.getUTCDate());
            const hojeUtc = new Date(hoje.getUTCFullYear(), hoje.getUTCMonth(), hoje.getUTCDate());


            if (dataNascUtc > hojeUtc) {
                mostrarErro(dataNascimento, 'A Data de Nascimento não pode ser uma data futura.');
                formValido = false;
            }
        }

    } else if (idEtapa === 'etapa-conta') {
        const usuario = document.getElementById('usuario');
        const senha = document.getElementById('senha');
        const confirmarSenha = document.getElementById('confirmarSenha');

        if (!usuario.value.trim()) {
            mostrarErro(usuario, 'O campo Nome de usuário é obrigatório.');
            formValido = false;
        } else if (usuario.value.trim().length < 3) {
            mostrarErro(usuario, 'O Nome de usuário deve ter pelo menos 3 caracteres.');
            formValido = false;
        }

        if (!senha.value) {
            mostrarErro(senha, 'O campo Senha é obrigatório.');
            formValido = false;
        } else if (senha.value.length < 6) {
            mostrarErro(senha, 'A senha deve ter pelo menos 6 caracteres.');
            formValido = false;
        }

        if (!confirmarSenha.value) {
            mostrarErro(confirmarSenha, 'O campo Confirme a Senha é obrigatório.');
            formValido = false;
        } else if (senha.value !== confirmarSenha.value) {
            mostrarErro(confirmarSenha, 'As senhas não coincidem.');
            formValido = false;
        }
    }
    return formValido;
}

// --- FUNÇÕES AUXILIARES DE VALIDAÇÃO ---

function mostrarErro(inputElement, mensagem) {
    inputElement.classList.add('input-erro');

    const labelElement = inputElement.parentElement.querySelector('label[for="' + inputElement.id + '"]');
    if (labelElement) {
        labelElement.classList.add('label-erro');
    }

    const mensagemErroExistente = inputElement.parentElement.querySelector('.mensagem-erro');
    if (mensagemErroExistente) {
        mensagemErroExistente.remove();
    }

    const mensagemElement = document.createElement('small');
    mensagemElement.className = 'mensagem-erro';
    mensagemElement.textContent = mensagem;
    inputElement.insertAdjacentElement('afterend', mensagemElement);
}

function limparErro(inputElement) {
    inputElement.classList.remove('input-erro');

    const labelElement = inputElement.parentElement.querySelector('label[for="' + inputElement.id + '"]');
    if (labelElement) {
        labelElement.classList.remove('label-erro');
    }

    const mensagemErroElement = inputElement.parentElement.querySelector('.mensagem-erro');
    if (mensagemErroElement) {
        mensagemErroElement.remove();
    }
}

function limparErrosDaEtapa(idEtapa) {
    const etapa = document.getElementById(idEtapa);
    if (etapa) {
        const inputsComErro = etapa.querySelectorAll('.input-erro');
        inputsComErro.forEach(input => limparErro(input));
    }
}

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function isValidCPF(cpf) {
    cpf = String(cpf).replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {

        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let dv1Calculado = (resto === 10 || resto === 11) ? 0 : resto;
    let dv1Fornecido = parseInt(cpf.charAt(9));

    if (dv1Calculado !== dv1Fornecido) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let dv2Calculado = (resto === 10 || resto === 11) ? 0 : resto;
    let dv2Fornecido = parseInt(cpf.charAt(10));

    if (dv2Calculado !== dv2Fornecido) {
        return false;
    }
    return true;
}