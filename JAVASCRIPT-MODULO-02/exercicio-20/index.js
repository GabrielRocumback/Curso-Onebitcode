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
const gridItens = document.querySelectorAll('.grid-item');
const gameStatus = document.getElementById('game-status');
const cpuCheckbox = document.getElementById('cpu-checkbox');

//Estado do jogo
const gridArray = Array.from(gridItens);
const itensID = gridArray.map(item => item.id)
let players = []
let itensGame = []
let nextMove = 'o'
const rounds = 3

//Eventos
form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Verificar se os campos de nome estão preenchidos
    if ((player1.value.trim() === '' || player2.value.trim() === '') && cpuCheckbox.checked === false) {
        displayMessage('Por favor, insira os nomes dos dois jogadores.', 'error');
        return;
    }

    // Verificar se os nomes são diferentes
    if (player1.value.trim() === player2.value.trim()) {
        displayMessage('Os nomes dos jogadores devem ser diferentes!', 'error');
        return;
    }

    // Iniciar o jogo
    players.push({ id: player1.id, nome: player1.value, simbolo: 'o', vitorias: 0 });
    players.push({ id: player2.id, nome: player2.value, simbolo: 'x', vitorias: 0 });
    // players.forEach(player => { 
    //     const playerScore = document.getElementById(player.ID + '-score');
    //     const data = 0;
    //     playerScore.setAttribute('data-value', data);
    //     playerScore.querySelector('span').innerHTML = data;
    // });
    itensID.forEach(item => {
        itensGame.push({ gridItem: item, simbolo: '' });
    });

    toggleDisabledElement(player1);
    if (!cpuCheckbox.checked) {
        toggleDisabledElement(player2);
    }
    toggleDisabledElement(cpuCheckbox);
    toggleDisabledElement(startButton);
    toggleDisabledElement(restartButton, false);
    nextPlayer.innerHTML = player1.value;
    addGridEvent();
    enabledGrid();
    gameStatus.querySelector('span').innerHTML = 'Em andamento';
    displayMessage('Jogo iniciado! Boa sorte!', 'success');
})

clearButton.addEventListener('click', () => {
    clearGrid();
})

restartButton.addEventListener('click', restartGame);

cpuCheckbox.addEventListener('change', () => {
    player2.disabled = cpuCheckbox.checked;
    player2.value = cpuCheckbox.checked ? 'CPU' : '';
})

//Funções
function addGridEvent() {
    gridContainer.addEventListener('click', click = async (ev) => {
        const gridItem = ev.target;
        if (gridItem.classList.contains('grid-item')) {
            const item = gridItem.querySelector('p');
            if (item.innerHTML.trim() === '') {
                console.log('click');
                toggleDisabledElement(clearButton);
                toggleDisabledElement(restartButton);
                gridItem.classList.add('selected');
                item.innerHTML = nextMove;
                item.classList.add(nextMove === 'x' ? 'selected-green' : 'selected-blue');
                changeNextPlayer(nextPlayer.innerHTML);
                itensGame.find(item => item.gridItem === gridItem.id).simbolo = nextMove;
                nextMove = changeNextMove(nextMove);

                let response = await validateItems();
                if (nextPlayer.innerHTML.toLocaleUpperCase() === 'CPU') {
                    response = await cpuGame(response); // Garantir que a jogada da CPU seja processada
                }

                if (response.status === 'ongoing') {
                    toggleDisabledElement(clearButton, false);
                    toggleDisabledElement(restartButton, false);
                }

                if (response.status === 'win') {
                    gameStatus.querySelector('span').innerHTML = 'Fim de jogo';
                    displayMessage(response.winner + ' venceu!', 'success');
                    toggleDisabledElement(clearButton);
                    toggleDisabledElement(restartButton, false);
                } 
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
        default:
            break;
    }
}

function changeNextPlayer(value) {
    switch (value) {
        case player1.value:
            nextPlayer.innerHTML = player2.value;
            break;
        case player2.value:
            nextPlayer.innerHTML = player1.value;
            break;
        default:
            break;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cpuGame(response) {
    if (response.status === 'draw') {
        clearGrid();
    }
    const availableMoves = itensGame.filter(item => item.simbolo === '');
    disabledGrid();
    if (availableMoves.length > 0) {
        await delay(1000); // Aguarda 1 segundo
        const response = await cpuMove();
        if (response.status === 'win') {
            return response; // Retorna o responseado da vitória
        }
        enabledGrid(); // Reabilita o tabuleiro se a CPU não venceu
    } else {
        console.log('Empate');
        await delay(1000); // Aguarda 1 segundo
        clearGrid(); // Reinicia o jogo em caso de empate
        return { status: 'draw' };
    }
    return { status: 'ongoing' }; // Jogo continua
}

async function cpuMove() {
    const availableMoves = itensGame.filter(item => item.simbolo === '');
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const randomMove = availableMoves[randomIndex];

    if (randomMove) {
        console.log('Jogada da CPU');
        const gridCell = document.getElementById(randomMove.gridItem).querySelector('p');
        gridCell.innerHTML = nextMove;
        gridCell.classList.add(nextMove === 'x' ? 'selected-green' : 'selected-blue');
        randomMove.simbolo = nextMove;

        nextMove = changeNextMove(nextMove);
        changeNextPlayer(nextPlayer.innerHTML);

        const response = await validateItems(); // Valida após a jogada da CPU
        if (response.status === 'win') {
            console.log('Vitória da CPU');
            return response;
        }
        if (response.status === 'ongoing' && nextPlayer.innerHTML.toLocaleUpperCase() === 'CPU') {
            console.log('Loop da CPU');
            await delay(2000); // Aguarda 1 segundo
            clearGrid();
            await cpuGame(response); // Recursividade para a jogada da CPU
        }
    }
    return { status: 'ongoing' }; // Retorna se a CPU não venceu
}

async function validateItems() {
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

    for (const combination of winningCombinations) {
        // const [a, b, c] = combination.map(id => itensGame.find(item => item.gridItem === id));
        const a = itensGame.find(item => item.gridItem === combination[0])
        const b = itensGame.find(item => item.gridItem === combination[1])
        const c = itensGame.find(item => item.gridItem === combination[2])

        // Verifica se todos têm o mesmo símbolo
        if (a && b && c && a.simbolo && a.simbolo === b.simbolo && a.simbolo === c.simbolo) {
            const winner = players.find(player => player.simbolo === a.simbolo);
            changeScore(winner);
            nextPlayer.innerHTML = winner.nome;
            nextMove = winner.simbolo;

            combination.forEach(id => document.getElementById(id).classList.add('grid-winner'));
            disabledGrid();

            return showWinner();
        }
    }

    // Se todas as células estiverem preenchidas e nenhum vencedor for encontrado
    if (itensGame.every(item => item.simbolo !== '')) {
        changeScore(null);
        return { status: 'draw' };
    }
    return { status: 'ongoing' };
}

function changeScore(player) {
    if (player) {
        player.vitorias += 1;
        const playerScore = document.getElementById(player.id + '-score');
        const data = parseInt(playerScore.dataset.value) + 1;
        playerScore.setAttribute('data-value', data);
        playerScore.querySelector('span').innerHTML = data;
    } else {
        const drawScore = document.getElementById('draw-score');
        const data = parseInt(drawScore.dataset.value) + 1;
        drawScore.setAttribute('data-value', data);
        drawScore.querySelector('span').innerHTML = data;
    }
}

function showWinner() {
    const winnerPlayer = players.find(player => player.vitorias === rounds);
    if (winnerPlayer) {
        const winnerScore = document.getElementById('winner');
        const data = winnerPlayer.id;
        winnerScore.setAttribute('data-value', data);
        winnerScore.querySelector('span').innerHTML = players.find(player => player.id === data).nome;
        return { status: 'win', winner: winnerPlayer.nome };
    }
    return { status: 'ongoing' };
}

function toggleDisabledElement(control, status = true) {
    control.toggleAttribute('disabled', status);
}

function enabledGrid() {
    gridItens.forEach(item => {
        if (item.querySelector('p').innerHTML === '') {
            item.classList.remove('selected');
        }
    })
}

function disabledGrid() {
    gridItens.forEach(item => {
        item.classList.add('selected');
    })
}

function removeGridEvent() {
    gridContainer.removeEventListener('click', click);
}

function clearGrid() {
    enabledGrid();
    itensGame.forEach(item => {
        item.simbolo = '';
    })
    gridItens.forEach(item => {
        const itemMove = item.querySelector('p');
        itemMove.innerHTML = '';
        itemMove.classList.remove('selected-blue', 'selected-green');
        item.classList.remove('grid-winner', 'selected');
    })
}

function restartGame() {
    nextMove = 'o';
    players = [];
    itensGame = [];
    player1.value = '';
    player2.value = '';
    nextPlayer.innerHTML = '';
    clearGrid();
    removeGridEvent();
    toggleDisabledElement(player1, false);
    toggleDisabledElement(player2, false);
    toggleDisabledElement(startButton, false);
    toggleDisabledElement(restartButton);
    toggleDisabledElement(cpuCheckbox, false);
    cpuCheckbox.checked = false;
    scoreboard.querySelectorAll('li').forEach(item => {
        item.dataset.value = (item.id === 'winner' || item.id === 'game-status') ? ' ' : 0;
        item.querySelector('span').textContent = item.dataset.value;
    });
    displayMessage('Jogo reiniciado com sucesso!', 'restart');
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