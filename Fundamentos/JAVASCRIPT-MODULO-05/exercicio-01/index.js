function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_=+-])[A-Za-z\d@$!%*?&_=+-]{8,}$/;
    return regex.test(senha);
}

function validarFormulario() {
    const email = validarEmail(document.getElementById("email").value);
    const senha = validarSenha(document.getElementById("senha").value);

    try {
        if (!email) {
            throw new Error("Email inválido!");
        }
        if (!senha) {
            throw new Error("Senha inválida!");
        }
        alert("Email e senha válidos!");
    }
    catch (error) {
        alert(error.message);
    }
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
});