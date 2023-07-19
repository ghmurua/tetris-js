function onKeyDownHandler(event) {
    let kc = event.which || event.keyCode

    if (kc === 37) {
        leftCollide()
    }
    else if (kc === 39) {
        rightCollide()
    }
    else if (kc === 40) {
        move(10)    // abajo
    }

    if (kc === 38) {
        canRotateTouchingBorder(1)      // der
    }
    else if (kc === 90) {
        canRotateTouchingBorder(-1)     // izq
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
            break
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
            break
        }
    }
    if (nothingAtLeft) move(-1)
}

function getScreenSide() {
    where = piece[position][1] % 10
    if (where > 0 && where < 6) side = 'L'
    else side = 'R'
    return side
}

function canRotateTouchingBorder(dir) {
    let side = getScreenSide()
    let nextPosition = position + dir

    if (nextPosition > (numberOfPositions + dir)) nextPosition = 2
    if (nextPosition < 2) nextPosition = numberOfPositions + dir

    let rightBorder = false
    let iRightBorder = false   // pieza i se pasa por 2 al rotar a la derecha
    let leftBorder = false

    if (side === 'L') {
        for (let i=0; i<4; i++) {
            leftBorder = (piece[nextPosition][i]) % 10 === 0
            if (leftBorder) break
        }
    }
    if (side === 'R') {
        for (let i=3; i>=0; i--) {
            rightBorder = (piece[nextPosition][i] - 1) % 10 === 0
            // iRightBorder si es false no se guarda y no hace falta el break
            if ((piece[nextPosition][i] - 2) % 10 === 0) {
                iRightBorder = true
            }
            if (rightBorder) break
        }
    }
 
    if (side === 'L' && leftBorder) {
        move(1)
        rotate(dir)
    }
    else if (side === 'R' && rightBorder) {
        if (iRightBorder) move(-1)
        move(-1)
        rotate(dir)
    }
    else {
        rotate(dir)
    }
}