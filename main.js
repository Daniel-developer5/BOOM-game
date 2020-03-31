let coundown = document.getElementById("countdown")
let bombBox = document.getElementsByClassName("bomb-box")[0]
let timer = 120
let result = document.getElementsByClassName("result")[0]
let btns = document.querySelectorAll(".btn")
let backButton = document.getElementById("back-btn")
let form = document.getElementsByTagName("form")[0]
let codeRow = document.querySelectorAll(".item")
let close = document.querySelectorAll(".close")
let reloader = document.getElementById("reload")
let endText = document.getElementById("end-text")

setInterval(() => {
    if (timer > 0) {
        --timer
        let minutes = Math.floor(timer / 60)
        let seconds = timer % 60
        coundown.textContent = minutes + ' : ' + seconds
    } else {
        gameEnd('lose', 'You lose!')
    }
},1000)

function gameEnd(classN, text) {
    close.forEach(elem => {
        elem.classList.add(classN)
    })
    endText.textContent = text
}

let codeArrays = [
    [], [], [], []
]

let code = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
]

let diff = [
    Math.floor(Math.random() * 21), 
    Math.floor(Math.random() * 21), 
    Math.floor(Math.random() * 21), 
    Math.floor(Math.random() * 21)
]

fillArrPlus()

function fillArrPlus() {
    codeArrays.forEach((elem, index) => {
        elem.push(
            code[index] - diff[index]*2, code[index] - diff[index], '__', code[index] + diff[index], code[index] + diff[index]*2
        )
    })
}

codeRow.forEach((elem, index) => {
    elem.textContent = codeArrays[index].join(', ')
})

btns.forEach(elem => {
    elem.addEventListener('click', () => {
        result.value += elem.value
    })
})

backButton.addEventListener('click', () => {
    result.value = result.value.slice(0, -1)
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let sum = code.reduce((a, b) => {
        return String(a + b);
    }, 0)
    if (sum == result.value) {
        gameEnd('win', 'You win!')
    } else {
        timer -= 20
        result.value = 'Wrong password!'
        result.classList.add('error')
        setTimeout(() => {
            result.value = ''
            result.classList.remove('error')
        }, 500)
    }
})

reloader.addEventListener('click', () => {
    location.reload()
})


