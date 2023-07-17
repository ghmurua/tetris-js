function onKeyDownHandler(event) {
    let kc = event.which || event.keyCode

    if (kc === 37) {
        leftCollide(-1)    // izquierda
    }
    else if (kc === 39) {
        rightCollide(1)     // derecha
    }
    else if (kc === 40) {
        move(10)    // abajo
    }

    if (kc === 38) {
        rotate(1)   // derecha
    }
    else if (kc === 90) {
        rotate(-1)  // izquierda
    }
}

document.querySelector('.main').addEventListener("mouseup",(e)=>{
    document.querySelector('.keyCapturer').focus()
})

function move(dir) {
    updatePiece()

    for (let i=2; i<2+numberOfPositions; i++) {
        for (let j=0; j<4; j++) {
            piece[i][j] += dir
        }
    }

    updatePiece()
    collide()
}

function rotate(dir) {
    updatePiece()

    position += dir

    if (position > (numberOfPositions + 1)) position = 2
    else if (position < 2) position = numberOfPositions + 1

    updatePiece()
    collide()
}

function rightCollide() {
    nothingAtRight = true
    for (let i=0; i<4; i++) {
        rightBorder = (piece[position][i]) % 10 === 0
        rightOldPiece = oldPieces.includes(piece[position][i] + 1)
        if (rightBorder || rightOldPiece) {
            nothingAtRight = false
        }
    }
    if (nothingAtRight) move(1)
}

function leftCollide() {
    nothingAtLeft = true
    for (let i=0; i<4; i++) {
        leftBorder = (piece[position][i]-1) % 10 === 0
        leftOldPiece = oldPieces.includes(piece[position][i]-1)
        if (leftBorder || leftOldPiece) {
            nothingAtLeft = false
        }
    }
    if (nothingAtLeft) move(-1)
}