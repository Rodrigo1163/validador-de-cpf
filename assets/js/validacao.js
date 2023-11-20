function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function(){
    document.querySelector('.inputCPF').focus();
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;
    
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    
    const novoCpf = cpfParcial + digito1 + digito2;
    
    const valido = this.valido(novoCpf)
    
    return novoCpf === this.cpfLimpo;
};
ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial); //string => array
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        
        ac += (regressivo * Number(val)) ;
        regressivo--;
        return ac;
    }, 0)
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}
ValidaCPF.prototype.isSequencia = function(){
    const sequencia =  this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

ValidaCPF.prototype.valido = function(novoCpf){
    const spanCPF = document.querySelector('.validaCPF');
    if(!this.cpfLimpo) {
        spanCPF.innerHTML = 'Campo Vazio';
        spanCPF.style.color = 'red';
        return;
    }
    if(novoCpf === this.cpfLimpo){
        spanCPF.innerHTML = 'CPF válido';
        spanCPF.style.color = 'green'; 
    } else{
        spanCPF.innerHTML = 'CPF inválido';
        spanCPF.style.color = 'red';
    }
}

document.addEventListener('click', e => {
    const el = e.target;

    if(el.classList.contains('btnVerificar')){
        const inputCPF = document.querySelector('.inputCPF').value;
        const cpf = new ValidaCPF(inputCPF);
        cpf.valido();
        cpf.valida();
        document.querySelector('.inputCPF').focus();
        
        
    }
});
document.addEventListener('keydown', e => {
    if(e.keyCode === 13){
        const inputCPF = document.querySelector('.inputCPF').value;
        const cpf = new ValidaCPF(inputCPF);
        cpf.valido();
        cpf.valida();
        document.querySelector('.inputCPF').focus();
        
        
    }
})

function adicionaMascara(cpf) {
    let mascaraCpf = cpf.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    mascaraCpf = mascaraCpf.replace(/(\d{3})(\d)/, "$1.$2");
    mascaraCpf = mascaraCpf.replace(/(\d{3})(\d)/, "$1.$2");
    mascaraCpf = mascaraCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpf.value = mascaraCpf;
}

document.addEventListener('input', function (e) {
    const el = e.target;

    if (el.classList.contains('inputCPF')) {
        focus();
        adicionaMascara(el);
    }
});

document.querySelector('.inputCPF').focus();





