const vagas = []

function listarVagas() {
    const vagasEmTexto = vagas.reduce(function (textoFinal, vaga, indice) {
        // 1. nome, (x de candidatos)
        textoFinal += indice + 1 + ". "
        textoFinal += vaga.nome
        textoFinal += " (" + vaga.candidatos.length + " candidatos)\n"
        return textoFinal
    }, "")
    if (vagasEmTexto === "") {
        alert("Nenhuma vaga cadastrada")
    } else {
        alert(vagasEmTexto)
    }

}

function novaVaga() {
    const nome = prompt("Informe um nome para a vaga:")
    const descricao = prompt("Informe uma descrição para a vaga:")
    const dataLimite = prompt("Informe uma data limite (dd/mm/yyyy) para a vaga:")

    const confirmacao = confirm(
        "Deseja criar uma nova vaga com essas informações?\n" +
        "Nome: " + nome + "\nDescrição: " + descricao + "\nData Limite: " + dataLimite
    )

    if (confirmacao) {
        const novaVaga = { nome, descricao, dataLimite, candidatos: [] }
        vagas.push(novaVaga)
        alert("Vaga criada.")
    }
}

function exibirVaga() {
    const indice = prompt("Informe o índice da vaga que deseja exibir:")
    const vaga = vagas[indice - 1];
    let candidatosEmTexto

    if (vaga !== undefined) {
        if (vaga.candidatos.length > 0) {
            candidatosEmTexto = vaga.candidatos.reduce(function (textoFinal, candidato) {
                return textoFinal + "\n - " + candidato
            }, "")
        } else {
            candidatosEmTexto = 0
        }
        alert(
            "Vaga nº " + indice +
            "\nNome: " + vaga.nome +
            "\nDescrição: " + vaga.descricao +
            "\nData Limite: " + vaga.dataLimite +
            "\nQuantidade de candidatos: " + vaga.candidatos.length +
            "\nCandidatos inscritos: " + candidatosEmTexto
        )

    } else {
        alert("Vaga não cadastrada")
    }
}

function inscreverCandidato() {
    const candidato = prompt("Informe o nome do(a) candidato(a):")
    const indice = prompt("Informe o índice da vaga que deseja inscrever:")
    const vaga = vagas[indice - 1]

    const confirmacao = confirm(
        "Deseja inscrever o candidado " + candidato + "na vaga " + indice + "?\n" +
        "Nome: " + vaga.nome + "\nDescrição: " + vaga.descricao + "\nData limite: " + vaga.dataLimite
    )

    if (confirmacao) {
        vaga.candidatos.push(candidato)
        alert("Inscrição realizada.")
    }
}

function excluirVaga() {
    const indice = prompt("Informe o índice da vaga que deseja excluir:")
    const vaga = vagas[indice - 1]

    const confirmacao = confirm(
        "Tem certeza que deseja excluir a vaga " + indice + "?\n" +
        "Nome: " + vaga.nome + "\nDescrição: " + vaga.descricao + "\nData limite: " + vaga.dataLimite
    )

    if (confirmacao) {
        vagas.splice(indice, 1)
        alert("Vaga excluída.")
    }
}

function menu() {
    return prompt(
        "Bem vindo à vagas.com" +
        "\n1 - Listar vagas disponíveis" +
        "\n2 - Criar um nova vaga" +
        "\n3 - Visualizar uma vaga" +
        "\n4 - Inscrever um candidato" +
        "\n5 - Excluir uma vaga" +
        "\n6 - Sair")
}

function executar() {
    let opcao = "6"
    do {
        opcao = menu()
        switch (opcao) {
            case "1":
                listarVagas()
                break;
            case "2":
                novaVaga()
                break;
            case "3":
                exibirVaga()
                break;
            case "4":
                inscreverCandidato()
                break;
            case "5":
                excluirVaga()
                break;
            case "6":
                break;
            default:
                alert("Opção inválida!");
                break;
        }
    } while (opcao !== "6")
}

executar()