console.log('Client side javascript file is loaded!')

const imageForm = document.querySelector('form')
const messageOne = document.querySelector('#location')

detectAndCompute();

function detectAndCompute() {

    imageForm.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch('/name').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.notes
                }
            })
        })
    })
}