class ValidandoCpf {
    constructor(cpf) {
        this.cpf = cpf

    }

    clearCpf() {
        const cpfLimpo = this.cpf.replace(/\D+/g, '')

        // console.log(cpfLimpo)
        return cpfLimpo
    }

    repeticao(cpfLimpo) {

        const cpfArray = Array.from(cpfLimpo)
        // console.log(cpfArray)

        const filtro = cpfArray.filter(e => e == cpfArray[0])

        if (filtro.length === 11) return true

        // OU
        // cpfLimpo.charAt(0).repeat(11) === cpfLimpo
    }

    validaCpf() {
        const cpfLimpo = this.clearCpf()
        this.repeticao(cpfLimpo)

        if (this.repeticao(cpfLimpo) === true) return console.error('O CPF digitado é uma repetição e por isso não é válido. Digite novamente.');
        if (cpfLimpo.length !== 11) return console.error('O cpf digitado não contém 11 caracteres. Digite novamente!');
        if (typeof cpfLimpo === 'undefined') return console.error('O cpf digitado não é válido. Verifique e tente novamente!');

        const cpfParcial = cpfLimpo.slice(0, -2)
        const digito1 = this.digito(cpfParcial, cpfLimpo)

        const cpfParcial2 = cpfLimpo.slice(0, -2) + digito1
        const digito2 = this.digito(cpfParcial2, cpfLimpo)

        return cpfLimpo == cpfParcial + digito1 + digito2 
        
    }

    digito(cpfParcial, cpfLimpo) {

        const cpfArray = Array.from(cpfParcial)
        // console.log(cpfArray)

        let regressivo = cpfArray.length + 1
        // console.log(regressivo)

        const total = cpfArray.reduce((ac, val) => {
            ac += (regressivo * Number(val))
            regressivo--

            return ac
        }, 0)
        // console.log(total)

        let digito = cpfLimpo.length - (total % 11)
        // console.log(digito)
        if (digito > 9) digito = 0
        return digito
    }

}

// const cpf1 = new ValidandoCpf('705.484.450-52')
// const cpf2 = new ValidandoCpf('070.987.720-03')
// const cpf3 = new ValidandoCpf('070.987.720-07')
// const cpf4 = new ValidandoCpf('111.111.111-11')


// cpf1.validaCpf()
// cpf2.validaCpf()
// cpf3.validaCpf()
// cpf4.validaCpf()
