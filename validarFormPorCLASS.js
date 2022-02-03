class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })

        this.formulario.querySelector('.cpf').addEventListener('keypress', (c) => {
            this.mascaraCpf()
        })
    }

    mascaraCpf() {
        const campoCpf = this.formulario.querySelector('.cpf')

        if (campoCpf.value.length == 3 || campoCpf.value.length == 7) campoCpf.value += '.'
        if (campoCpf.value.length == 11) campoCpf.value += '-'
    }

    handleSubmit(e) {
        e.preventDefault()
        // console.log('Formulario não enviado')
        const ValidateFileds = this.validateFields()

        if (this.ValidateFields) {
            alert('Formulário enviado')
            this.formulario.submit()
        }
    }

    validateFields() {
        let valid = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText
            if (campo.value.length === 0) {
                this.createError(campo, `Campo "${label}" não pode estar em branco`)

                valid = false
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false
            }

            if (campo.classList.contains('senha')) {
                if (!this.validaSenha(campo)) valid = false
            }
        }

        return valid
    }

    validaSenha(campo) {
        const senha = campo.value
        let valid = true
        if (senha.length < 6 || senha.length > 12) {
            this.createError(campo, 'Senha precisa ter entre 6 e 12 caracteres. Por favor, digite uma nova senha.')

            valid = false
        }

        const repetirSenha = this.formulario.querySelector('.repetirSenha')

        if (senha !== repetirSenha.value) {
            this.createError(senha, 'Senhas não são iguais')
            this.createError(repetirSenha, 'Senhas não são iguais')
        }

        return valid
    }

    validaUsuario(campo) {

        const usuario = campo.value
        let valid = true

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres. Por favor, digite novamente.')
            valid = false
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Nome de usuário precisa conter apenas letras e/ou números')
            valid = false
        }
        return valid
    }

    validaCPF(campo) {
        const cpf = new ValidandoCpf(campo.value)

        if (!cpf.validaCpf()) {
            this.createError(campo, 'CPF inválido')
            return false
        }

        return true
    }

    createError(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new ValidaFormulario()