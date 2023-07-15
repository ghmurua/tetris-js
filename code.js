const game = document.querySelector('.game')

s = [24,15,25,16]
z = [14,15,25,26]
piece = []

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
    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[i]}`).classList.toggle('s')
    }
}

newGame()
newPiece(s)