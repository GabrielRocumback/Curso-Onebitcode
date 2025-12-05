const personagem1 = prompt('Digite o nome do primeiro personagem:')
let ataquePersonagem1 = Number(prompt('Digite o poder de ataque:'))

const personagem2 = prompt('Digite o nome do segundo personagem:')
let vidaPersonagem2 = Number(prompt('Digite a quantidade de vida:'))
const defesaPersonagem2 = Number(prompt('Digite o poder de defesa:'))
let escudoPersonagem = prompt('Informe se ele possui escudo:').includes(true,'sim', 'Sim', 'SIM', 1) ? true : false
// if (escudoPersonagem.includes(true,'sim', 'Sim', 'SIM', 1)) {
//     escudoPersonagem = true
// } else {
//     escudoPersonagem = false
// } 

let danoCausado

if ((ataquePersonagem1 > defesaPersonagem2) && (escudoPersonagem == false)) {
    danoCausado = ataquePersonagem1 - defesaPersonagem2
} else if ((ataquePersonagem1 > defesaPersonagem2) && (escudoPersonagem == true)) {
    danoCausado = (ataquePersonagem1 - defesaPersonagem2) / 2
} else {
    danoCausado = 0
}

vidaPersonagem2 -= danoCausado


alert('O personagem '+ personagem1 +' causou '+ danoCausado +' de dano ao personagem '+ personagem2 +' deixando ele com '+ vidaPersonagem2 +' de vida')