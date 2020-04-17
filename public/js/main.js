console.log('Client side javascript file is loaded!')

const imageForm = document.querySelector('form')
const messageOne = document.querySelector('#result')

detectAndCompute();

function detectAndCompute() {

    imageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        messageOne.textContent = "Loading...."
        var loading = new SpeechSynthesisUtterance("Loading, Please wait few seconds.");
        window.speechSynthesis.speak(loading);

        fetch('/detect').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error

                    console.log(data.error)
                } else {
                    messageOne.textContent = data.notes
                    console.log(data.notes)
                    var msg = new SpeechSynthesisUtterance(data.notes);
                    window.speechSynthesis.speak(msg);
                }
            })
        })
    })
}