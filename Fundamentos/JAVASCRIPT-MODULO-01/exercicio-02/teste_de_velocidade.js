let carro1 = prompt('Digite o nome do veículo 1:')

let velocidadeCarro1 = parseFloat(prompt('Digite a velocidade do veículo 1:'))

let carro2 = prompt('Digite o nome do veículo 2:')

let velocidadeCarro2 = parseFloat(prompt('Digite a velocidade do veículo 2:'))

if (velocidadeCarro1 > velocidadeCarro2) {
    alert('O veículo '+ carro1 +' é mais rápido que o '+ carro2 +'')
} else if (velocidadeCarro1 < velocidadeCarro2) {
    alert('O veículo '+ carro1 +' é mais rápido que o '+ carro2 +'')
} else{
    alert('Os dois veículos tem a mesma velocidade')
}