//Elementos
const form = document.querySelector('form')
const gridContainer = document.querySelector('.grid-container');
const startButton = document.getElementById('start-button')
const clearButton = document.getElementById('clear-button')
const restartButton = document.getElementById('restart-button')
const player1 = document.getElementById('player-1')
const player2 = document.getElementById('player-2')
const nextPlayer = document.querySelector('.menu p span')
const scoreboard = document.querySelector('.scoreboard')

//Estado do jogo
const gridItens = document.querySelectorAll('.grid-item');
const gridArray = Array.from(gridItens);
const itensID = gridArray.map(item => item.id)
let players = []
let itensGame = []
let nextMove = 'o'

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Verificar se os campos de nome estão preenchidos
    if (player1.value.trim() === '' || player2.value.trim() === '') {
        displayMessage('Por favor, insira os nomes dos dois jogadores.', 'error');
        return;
    }

    // Verificar se os nomes são diferentes
    if (player1.value.trim() === player2.value.trim()) {
        displayMessage('Os nomes dos jogadores devem ser diferentes!', 'error');
        return;
    }

    players.push({ ID: player1.id, Nome: player1.value, Simbolo: 'o', Vitorias: 0 });
    players.push({ ID: player2.id, Nome: player2.value, Simbolo: 'x', Vitorias: 0 });
    players.forEach(player => {
        const playerScore = document.getElementById(player.ID + '-score');
        playerScore.innerHTML = player.Nome + ': 0';
    });
    itensID.forEach(item => {
        itensGame.push({ gridItem: item, Simbolo: '' });
    });

    toggleDesabledElement(player1);
    toggleDesabledElement(player2);
    toggleDesabledElement(startButton);
    toggleDesabledElement(restartButton);
    nextPlayer.innerHTML = player1.value;
    addGridEvent();

    displayMessage('Jogo iniciado! Boa sorte!', 'success');
})

clearButton.addEventListener('click', () => {
    clearGrid();
    addGridEvent();
})

restartButton.addEventListener('click', restartGame);

function addGridEvent() {
    gridContainer.addEventListener('click', click = (ev) => {
        const gridItem = ev.target;
        if (gridItem.classList.contains('grid-item')) {
            const item = gridItem.querySelector('p');
            if (item.innerHTML.trim() === '') {
                // gridItem.classList.add('selected'); // Adiciona a classe de destaque
                item.innerHTML = nextMove;
                if (nextMove === 'x') {
                    gridItem.style.color = 'rgb(0, 120, 0)';
                } else {
                    gridItem.style.color = 'rgb(0, 0, 120)';
                }
                changeNextPlayer(nextPlayer.innerHTML);
                itensGame.find(item => item.gridItem === gridItem.id).Simbolo = nextMove;
                nextMove = changeNextMove(nextMove);
                validateItens();
            }
        }
    });
}

function changeNextMove(value) {
    switch (value) {
        case 'x':
            return nextMove = 'o';
        case 'o':
            return nextMove = 'x';
    }
}

function changeNextPlayer(value) {
    switch (value) {
        case player1.value:
            nextPlayer.innerHTML = player2.value;
            break
        case player2.value:
            nextPlayer.innerHTML = player1.value;
            break
    }
}

function changeScore(player) {
    if (player) {
        player.Vitorias += 1;
        const playerScore = document.getElementById(player.ID + '-score');
        const data = parseInt(playerScore.dataset.value) + 1;
        playerScore.setAttribute('data-value', data);
        playerScore.innerHTML = player.Nome + ': ' + data;
    } else {
        const drawScore = document.getElementById('draw-score');
        const data = parseInt(drawScore.dataset.value) + 1;
        drawScore.setAttribute('data-value', data);
        drawScore.innerHTML = 'Empates: ' + data;
    }
}

function toggleDesabledElement(control) {
    control.toggleAttribute('disabled');
}

function validateItens() {
    const winningCombinations = [
        // Linhas
        ['grid-item-1', 'grid-item-2', 'grid-item-3'],
        ['grid-item-4', 'grid-item-5', 'grid-item-6'],
        ['grid-item-7', 'grid-item-8', 'grid-item-9'],
        // Colunas
        ['grid-item-1', 'grid-item-4', 'grid-item-7'],
        ['grid-item-2', 'grid-item-5', 'grid-item-8'],
        ['grid-item-3', 'grid-item-6', 'grid-item-9'],
        // Diagonais
        ['grid-item-1', 'grid-item-5', 'grid-item-9'],
        ['grid-item-3', 'grid-item-5', 'grid-item-7']
    ];

    // for (let combination of winningCombinations) {
    //     const [a, b, c] = combination;

    //     // Filtrar os itens correspondentes na combinação
    //     const itemA = itensGame.find(item => item.gridItem === a);
    //     const itemB = itensGame.find(item => item.gridItem === b);
    //     const itemC = itensGame.find(item => item.gridItem === c);

    //     // Verifica se todos têm o mesmo símbolo (não vazio)
    //     if (
    //         itemA && itemB && itemC &&
    //         itemA.Simbolo !== '' &&
    //         itemA.Simbolo === itemB.Simbolo &&
    //         itemA.Simbolo === itemC.Simbolo
    //     ) {
    //         const winner = players.find(player => player.Simbolo === itemA.Simbolo);
    //         changeScore(winner);
    //         nextPlayer.innerHTML = winner.Nome;
    //         nextMove = winner.Simbolo;

    //         document.getElementById(itemA.gridItem).classList.add('grid-winner');
    //         document.getElementById(itemB.gridItem).classList.add('grid-winner');
    //         document.getElementById(itemC.gridItem).classList.add('grid-winner');

    //         disabledGrid();
    //         return
    //     }
    // }

    for (const combination of winningCombinations) {
        const [a, b, c] = combination.map(id => itensGame.find(item => item.gridItem === id));

        if (a && b && c && a.Simbolo && a.Simbolo === b.Simbolo && a.Simbolo === c.Simbolo) {
            const winner = players.find(player => player.Simbolo === a.Simbolo);
            changeScore(winner);
            nextPlayer.innerHTML = winner.Nome;
            nextMove = winner.Simbolo;

            combination.forEach(id => document.getElementById(id).classList.add('grid-winner'));
            return showWinner();
        }
    }

    // Se todas as células estiverem preenchidas e nenhum vencedor for encontrado
    if (itensGame.every(item => item.Simbolo !== '')) {
        changeScore(null);
        disabledGrid();
    }
}

function disabledGrid() {
    gridContainer.removeEventListener('click', click);
}

function clearGrid() {
    itensGame.forEach(item => {
        item.Simbolo = '';
    })
    gridItens.forEach(item => {
        item.querySelector('p').innerHTML = '';
        item.classList.remove('grid-winner');
    })
}

function restartGame() {
    nextMove = 'o';
    clearGrid();
    disabledGrid();
    players = [];
    itensGame = [];
    player1.value = ''
    player2.value = ''
    nextPlayer.innerHTML = '';
    toggleDesabledElement(player1);
    toggleDesabledElement(player2);
    toggleDesabledElement(startButton);
    toggleDesabledElement(restartButton);
    scoreboard.querySelectorAll('li').forEach(item => {
        if (item.id === 'player-1-score') {
            item.dataset.value = '0';
            item.innerHTML = 'Jogador 1: 0';
        } else if (item.id === 'player-2-score') {
            item.dataset.value = '0';
            item.innerHTML = 'Jogador 2: 0';
        } else if (item.id === 'draw-score') {
            item.dataset.value = '0'
            item.innerHTML = 'Empates: 0';
        } else if (item.id === 'winner') {
            item.dataset.value = ' ';
            item.innerHTML = 'Vencedor: ';
        }
        displayMessage('Jogo reiniciado com sucesso!', 'restart');
    });
}

function showWinner() {
    disabledGrid();
    players.forEach(player => {
        if (player.Vitorias === 3) {
            scoreboard.querySelector('#winner').innerHTML = 'Vencedor: ' + player.Nome;
            toggleDesabledElement(clearButton);
        }
    })
}

function displayMessage(message, type) {
    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.textContent = message;
    feedbackMessage.classList.remove('hidden');
    feedbackMessage.classList.add('visible', type);

    // Remove a mensagem automaticamente após 3 segundos
    setTimeout(() => {
        feedbackMessage.classList.add('hidden');
        feedbackMessage.classList.remove('visible', type);
    }, 3000);
}

