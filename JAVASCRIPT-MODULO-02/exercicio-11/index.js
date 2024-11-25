function addPlayer(){
    const position = document.getElementById('position').value
    const name = document.getElementById('name').value
    const number = document.getElementById('number').value

    const confirmation = confirm("Escalar " + name + " como " + position + "?")

    if(confirmation){
        const teamList = document.getElementById('teamList')
        const playerItem = document.createElement('li')
        playerItem.id = 'player-' + number
        playerItem.innerText = position + ": " + name + " (" + number + ")"
        teamList.appendChild(playerItem)

        document.getElementById('position').value = ''
        document.getElementById('name').value = ''
        document.getElementById('number').value = ''
    }
}

function removePlayer(){
    const number = document.getElementById('numberToRemove').value
    const playerId = 'player-' + number
    const removePlayer = document.getElementById(playerId)
    
    const confirmation = confirm("Remover o jogador " + removePlayer.innerText + "?")

    if(confirmation){
        document.getElementById('teamList').removeChild(removePlayer)
        document.getElementById('numberToRemove').value = ''
    }
}