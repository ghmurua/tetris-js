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

function collide() {
    for (let i=0; i<4; i++) {
        withBottom = piece[position][i] + 10 > 200
        withOldPiece = oldPieces.includes(piece[position][i] + 10)
        if (withBottom || withOldPiece) {
            oldPieces.push(...piece[position])
            oldPieces.sort()
            findLine()
            newPiece()
        }
    }
}

function findLine() {
    for (let a=1; a<=191; a+=10) {
        b = a + 10
        count = 0
        for (let i=a; i<b; i++) {
            if (oldPieces.includes(i)) count++
        }
        if (count === 0) {
            empty = a  // ultima linea completamente vacia
        }
        if (count === 10) {
            // (a) es el inicio de la linea a eliminar
            oldPieces = oldPieces.filter((num) => num<a || num>a+9)
            len = oldPieces.length
            for (let j=0; j<len; j++) {
                if (oldPieces[j] < a) oldPieces[j] += 10
            }
            for (let j=a; j>empty; j-=10) {
                getDownLine(j)
            }
        }
    }
}

function getDownLine(line) {
    let endLine = line + 10
    for (let i=line; i<endLine; i++) {

        // busco piezas en el lugar i (here) y arriba de i (upper)
        here = document.querySelector(`.t${i}`).getAttribute('class')
        here = here.split(' ')

        if (here.length > 2) {
            here = here[2]      // si encuentra está en index 2
            document.querySelector(`.t${i}`).classList.remove(here)
        }

        upper = document.querySelector(`.t${i-10}`).getAttribute('class')
        upper = upper.split(' ')

        if (upper.length > 2) {
            upper = upper[2]
            document.querySelector(`.t${i-10}`).classList.remove(upper)
            document.querySelector(`.t${i}`).classList.add(upper)
        }
    }
}

newGame()
newPiece()