tableIMC = [
    { min: 0, max: 18.5, classification: 'Abaixo do peso' },
    { min: 18.5, max: 25, classification: 'Peso normal' },
    { min: 25, max: 30, classification: 'Sobrepeso' },
    { min: 30, max: 40, classification: 'Obesidade' },
    { min: 40, max: 100, classification: 'Obesidade morbida' }
]

function calculateIMC(weight, height) {
    return new Promise((resolve, reject) => {
        console.log('A promise está sendo executada.');
        setTimeout(() => {
            if (typeof weight !== 'number' || typeof height !== 'number') {
                reject('Peso e altura devem ser números');
            } else {
                console.log('Resolvendo a promise...');
                const imc = weight / (height * height);
                resolve(imc.toFixed(2));
            }
        }, 3 * 1000)
    })
}

function execute(weight, height) {
    calculateIMC(weight, height)
    .then((result) => {
        if (result < 0) {
            throw new Error('IMC inválido!');
        }
        const classification = tableIMC.find(item => result >= item.min && result < item.max);
        console.log(`Seu IMC: ${result}. \nClassificação: ${classification.classification}`);
    })
    .catch((err) => {
        console.log(`A promise foi rejeitada! Motivo: ${err}`);
    })
    .finally(() => {   
        console.log('A promise foi finalizada.');
        console.log('----------------------------------');
    })
}

execute(78, 1.75); // Peso e altura válidos
execute('78', 1.75); // Peso inválido
execute(78, '1.75'); // Altura inválida
execute(78, 0); // Altura inválida
execute(0, 1.75); // Peso inválido
execute(-78, 1.75); // Peso inválido