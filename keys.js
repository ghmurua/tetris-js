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
}

document.querySelector('.main').addEventListener("mouseup",(e)=>{
    document.querySelector('.keyCapturer').focus()
})

function move(direction) {
    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[i]}`).classList.toggle('s')
    }

    for (let i=0; i<4; i++) {
        piece[i] += direction
    }

    for (let i=0; i<4; i++) {
        document.querySelector(`.t${piece[i]}`).classList.toggle('s')
    }
}