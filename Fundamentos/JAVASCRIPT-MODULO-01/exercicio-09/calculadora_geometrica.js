function executar() {
    let opcao = "";

    do {
        opcao = exibirMenu();
        let valor1;
        let valor2;
        let valor3;
        let calc;
        switch (opcao) {
            case "1":
                valor1 = parseFloat(prompt("Digite a base do triângulo:"));
                valor2 = parseFloat(prompt("Digite a altura do triângulo:"));
                calc = calculate(1, valor1, valor1);
                alert("A área do triângulo é " + calc);
                break;
            case "2":
                valor1 = parseFloat(prompt("Digite a base do retângulo:"));
                valor2 = parseFloat(prompt("Digite a altura do retângulo:"));
                calc = calculate(2, valor1, valor1);
                alert("A área do retângulo é " + calc);
                break;
            case "3":
                valor1 = parseFloat(prompt("Digite a lado do quadrado:"));
                calc = calculate(3, valor1);
                alert("A área do quadrado é " + calc);
                break;
            case "4":
                valor1 = parseFloat(prompt("Digite a base maior do trapézio:"));
                valor2 = parseFloat(prompt("Digite a base menor do trapézio:"));
                valor3 = parseFloat(prompt("Digite a altura do trapézio:"));
                calc = calculate(4, valor1, valor2, valor3);
                alert("A área do trapézio é " + calc);
                break;
            case "5":
                valor1 = parseFloat(prompt("Digite o raio do círculo:"));
                calc = calculate(5, valor1);
                alert("A área do círculo é " + calc);
                break;
            case "6":
                break;
            default:
                alert("Opção inválida!");
        }
    } while (opcao !== "6");
}

function exibirMenu() {
    return prompt(
        "Bem vindo à Calculadora Geométrica" +
        "\n1 - Área do triângulo" +
        "\n2 - Área do retângulo" +
        "\n3 - Área do quadrado" +
        "\n4 - Área do trapézio" +
        "\n5 - Área do círculo" +
        "\n6 - Sair"
    );
}

function calculate(option, value1, value2 = 0, value3 = 0) {
    if (option == 1) {
        return (value1 * value2) / 2;
    } else if (option == 2) {
        return value1 * value2;
    } else if (option == 3) {
        return value1 * value1;
    } else if (option == 4) {
        return ((value1 + value2) * value3) / 2;
    } else if (option == 5) {
        const pi = 3.14;
        return pi * (value1 * value1);
    }
}

executar();
