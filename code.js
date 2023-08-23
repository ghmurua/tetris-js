const game = document.querySelector('.game')
const next = document.querySelector('.next')
const hold = document.querySelector('.hold')
const showScore = document.querySelector('.showScore')
const showLevel = document.querySelector('.showLevel')
const showLines = document.querySelector('.showLines')
const startMsg = document.querySelector('.startMsg')
const pauseMsg = document.querySelector('.pauseMsg')

// color, cant de posiciones, ubicaciones en cada posicion, next
function getRandomPiece() {
    tetrominoes = [
        ['o',1,[15,16,25,26],[7,8,12,13]],
        ['s',2,[24,15,25,16],[15,25,26,36],[8,9,12,13]],
        ['z',2,[14,15,25,26],[24,15,34,25],[7,8,13,14]],
        ['i',2,[15,16,17,18],[6,16,26,36],[7,8,9,10]],
        ['l',4,[14,15,24,16],[4,5,15,25],[14,6,15,16],[5,15,25,26],[9,12,13,14]],
        ['j',4,[14,15,16,26],[24,5,15,25],[4,14,15,16],[5,15,25,6],[7,12,13,14]],
        ['t',4,[24,15,25,26],[15,25,35,26],[24,25,35,26],[24,15,25,35],[8,12,13,14]]
    ]
    random = Math.floor(Math.random() * 7)
    return tetrominoes[random]
}

function initialPositionOf(name) {
    const initial = {
        "o": ['o',1,[15,16,25,26],[7,8,12,13]],
        "s": ['s',2,[24,15,25,16],[15,25,26,36],[8,9,12,13]],
        "z": ['z',2,[14,15,25,26],[24,15,34,25],[7,8,13,14]],
        "i": ['i',2,[15,16,17,18],[6,16,26,36],[7,8,9,10]],
        "l": ['l',4,[14,15,24,16],[4,5,15,25],[14,6,15,16],[5,15,25,26],[9,12,13,14]],
        "j": ['j',4,[14,15,16,26],[24,5,15,25],[4,14,15,16],[5,15,25,6],[7,12,13,14]],
        "t": ['t',4,[24,15,25,26],[15,25,35,26],[24,25,35,26],[24,15,25,35],[8,12,13,14]]
    }
    return initial[name]
}

let piece = []
let numberOfPositions = 0
let position = 0
let oldPieces = []
let clockInterval = ''
let speed = 800
let nextPiece = getRandomPiece()
let holdPiece = []
let holdUsed = false
let landed = false
let totalScore = 0
let totalLevel = 1
let totalLines = 0
let score = 0
let lines = 0
let hardDropScore = 0
let softDropScore = 0
let started = false
let isPaused = false

function setClock() {
    clockInterval = setInterval(()=>{
        move(10)
    }, speed)
}

function updateScore() {
    score = hardDropScore + softDropScore
    if (lines === 4) score += 800 * totalLevel
    if (lines === 3) score += 500 * totalLevel
    if (lines === 2) score += 300 * totalLevel
    if (lines === 1) score += 100 * totalLevel
    totalScore += score

    totalLines += lines
    totalLevel = Math.floor((totalLines / 10) + 1)

    showScore.innerHTML = totalScore
    showLevel.innerHTML = totalLevel
    showLines.innerHTML = totalLines
}

function init() {
    const fragment = document.createDocumentFragment()
    for ( let i=1; i<=200; i++ ) {
        let tile = document.createElement("DIV")
        tile.setAttribute('class',`tile t${i}`)
        fragment.appendChild(tile)
    }
    game.appendChild(fragment)

    const fragment2 = document.createDocumentFragment()
    for ( let j=1; j<=20; j++ ) {
        let tile = document.createElement("DIV")
        tile.setAttribute('class',`tile n${j}`)
        fragment2.appendChild(tile)
    }
    next.appendChild(fragment2)

    const fragment3 = document.createDocumentFragment()
    for ( let k=1; k<=20; k++ ) {
        let tile = document.createElement("DIV")
        tile.setAttribute('class',`tile h${k}`)
        fragment3.appendChild(tile)
    }
    hold.appendChild(fragment3)
}

function newGame() {
    setClock()
    updateNext()
    newPiece()
    game.classList.remove('gameStart')
    startMsg.classList.add('hide')
}

function pause() {
    if (isPaused) clearInterval(clockInterval)
    else setClock()

    game.classList.toggle('gamePause')
    pauseMsg.classList.toggle('hide')
}

function newPiece() {
    piece = nextPiece
    updateNext()
    nextPiece = getRandomPiece()
    updateNext()

    numberOfPositions = piece[1]
    position = 2    // index 2
    updatePiece()
    updateScore()
    hardDropScore = 0
    softDropScore = 0
}

function updatePiece() {
    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[position][i]}`).classList.toggle(`${piece[0]}`)
    }
}

function updateNext() {
    let len = nextPiece.length
    for (let i=0; i<4; i++) {
        document.querySelector(`.n${nextPiece[len-1][i]}`).classList.toggle(`${nextPiece[0]}`)
    }
}

function updateHold() {
    let len = holdPiece.length
    for (let i=0; i<4; i++) {
        document.querySelector(`.h${holdPiece[len-1][i]}`).classList.toggle(`${holdPiece[0]}`)
    }
}

function collide() {
    let withOldPiece
    for (let i=0; i<4; i++) {
        withBottom = piece[position][i] + 10 > 200
        withOldPiece = oldPieces.includes(piece[position][i] + 10)
        if (withBottom || withOldPiece) {
            oldPieces.push(...piece[position])
            oldPieces.sort()
            findLine()
            newPiece()
            holdUsed = false
            landed = true
        }
    }
}

function findLine() {
    lines = 0
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
            lines++
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

init()