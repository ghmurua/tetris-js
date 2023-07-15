const game = document.querySelector('.game')

// color, cant de posiciones, ubicaciones en cada posicion
o = ['o',1,[15,16,25,26]]
s = ['s',2,[24,15,25,16],[15,25,26,36]]
z = ['z',2,[14,15,25,26],[24,15,34,25]]
i = ['i',2,[15,16,17,18],[6,16,26,36]]
l = ['l',4,[14,15,24,16],[4,5,15,25],[14,6,15,16],[5,15,25,26]]
j = ['j',4,[14,15,16,26],[24,5,15,25],[4,14,15,16],[5,15,25,6]]
t = ['t',4,[14,5,15,16],[5,15,25,16],[14,15,25,16],[14,5,15,25]]

piece = []
numberOfPositions = 0
position = 0

function newGame() {
    const fragment = document.createDocumentFragment()
    for ( let i=1; i<=200; i++ ) {
        let tile = document.createElement("DIV")
        tile.setAttribute('class',`tile t${i}`)
        fragment.appendChild(tile)
    }
    game.appendChild(fragment)
}

function newPiece(basePiece) {
    piece = basePiece
    numberOfPositions = piece[1]
    position = 2    // index 2
    updatePiece()
}

function updatePiece() {
    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[position][i]}`).classList.toggle(`${piece[0]}`)
    }
}

newGame()
newPiece(j)