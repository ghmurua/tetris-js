let side = ''

function onKeyDownHandler(event) {
    let kc = event.which || event.keyCode

    if (kc === 37) {
        nothingAtLeft()
    }
    else if (kc === 39) {
        nothingAtRight()
    }
    else if (kc === 40) {
        move(10)          // DOWN
    }

    if (kc === 38) {
        tryRotate(1)      // UP rotar der
    }
    else if (kc === 90) {
        tryRotate(-1)     // Z rotar izq
    }
    else if (kc === 67) {
        tryHold()         // C
    }

    // ESC
    if (kc === 27) {
        clearInterval(clockInterval)
    }

    getScreenSide()
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

function nothingAtRight() {
    for (let i=0; i<4; i++) {
        rightBorder = (piece[position][i]) % 10 === 0
        rightOldPiece = oldPieces.includes(piece[position][i] + 1)
        if ((side === 'R' && rightBorder) || rightOldPiece) {
            return
        }
    }
    move(1)
}

function nothingAtLeft() {
    for (let i=0; i<4; i++) {
        leftBorder = (piece[position][i]-1) % 10 === 0
        leftOldPiece = oldPieces.includes(piece[position][i]-1)
        if ((side === 'L' && leftBorder) || leftOldPiece) {
            return
        }
    }
    move(-1)
}

function collideAtRight(piece) {
    for (let i=0; i<4; i++) {
        rightBorder = piece[i] % 10 === 1
        rightOldPiece = oldPieces.includes(piece[i])
        if ((side === 'R' && rightBorder) || rightOldPiece) {
            return true
        }
    }
    return false
}

function collideAtLeft(piece) {
    for (let i=0; i<4; i++) {
        leftBorder = piece[i] % 10 === 0
        leftOldPiece = oldPieces.includes(piece[i])
        if ((side === 'L' && leftBorder) || leftOldPiece) {
            return true
        }
    }
    return false
}

function getScreenSide() {
    where = piece[position][1] % 10
    if (where > 0 && where < 6) side = 'L'
    else side = 'R'
}

function tryRotate(dir) {
    let nextPosition = position + dir

    if (nextPosition > (numberOfPositions + 1)) nextPosition = 2
    else if (nextPosition < 2) nextPosition = numberOfPositions + 1

    if (!collideAtLeft(piece[nextPosition]) && !collideAtRight(piece[nextPosition])) {
        rotate(dir)
    }
    else if (collideAtLeft(piece[nextPosition]) && collideAtRight(piece[nextPosition])) {
        return
    }
    else if (collideAtRight(piece[nextPosition])) {
        console.log('L')
        move(-1)
        rotate(dir)
    }
    else if (collideAtLeft(piece[nextPosition])) {
        console.log('R')
        move(1)
        rotate(dir)
    }
}

function tryHold() {
    if (holdPiece.length === 0) {
        holdPiece = initialPositionOf(piece[0])
        updateHold()
        updatePiece()
        newPiece()
        holdUsed = true
    }
    else if (holdUsed === false) {
        updateHold()
        aux = holdPiece
        holdPiece = initialPositionOf(piece[0])
        updateHold()
        updatePiece()
        piece = aux
        numberOfPositions = piece[1]
        position = 2
        updatePiece()
        holdUsed = true
    }
}