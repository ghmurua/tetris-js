function onKeyDownHandler(event) {
    let kc = event.which || event.keyCode

    if (kc === 37) {
        move(-1)    // izquierda
    }
    else if (kc === 39) {
        move(1)     // derecha
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
    colide()
}

function rotate(dir) {
    updatePiece()

    position += dir

    if (position > (numberOfPositions + 1)) position = 2
    else if (position < 2) position = numberOfPositions + 1

    updatePiece()
    colide()
}