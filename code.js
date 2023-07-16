const game = document.querySelector('.game')

// color, cant de posiciones, ubicaciones en cada posicion
function getRandomPiece() {
    tetrominoes = [
        ['o',1,[15,16,25,26]],
        ['s',2,[24,15,25,16],[15,25,26,36]],
        ['z',2,[14,15,25,26],[24,15,34,25]],
        ['i',2,[15,16,17,18],[6,16,26,36]],
        ['l',4,[14,15,24,16],[4,5,15,25],[14,6,15,16],[5,15,25,26]],
        ['j',4,[14,15,16,26],[24,5,15,25],[4,14,15,16],[5,15,25,6]],
        ['t',4,[24,15,25,26],[15,25,35,26],[24,25,35,26],[24,15,25,35]]
    ]
    random = Math.floor(Math.random() * 7)
    return tetrominoes[random]
}

piece = []
numberOfPositions = 0
position = 0
oldPieces = []

function newGame() {
    const fragment = document.createDocumentFragment()
    for ( let i=1; i<=200; i++ ) {
        let tile = document.createElement("DIV")
        tile.setAttribute('class',`tile t${i}`)
        fragment.appendChild(tile)
    }
    game.appendChild(fragment)
}

function newPiece() {
    piece = getRandomPiece()

    numberOfPositions = piece[1]
    position = 2    // index 2
    updatePiece()
}

function updatePiece() {
    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[position][i]}`).classList.toggle(`${piece[0]}`)
    }
}

function colide() {
    for (let i=0; i<4; i++) {
        withBottom = piece[position][i] + 10 > 200
        withOldPiece = oldPieces.includes(piece[position][i] + 10)
        if (withBottom || withOldPiece) {
            oldPieces.push(...piece[position])
            newPiece()
        }
    }
}

newGame()
newPiece()