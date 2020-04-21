console.log('Client side javascript file is loaded!')

const messageOne = document.querySelector('#result')
const messageTwo = document.querySelector('#status')
const imageInput = document.querySelector('#input')
const loadBar = document.querySelector('.container');

imageInput.addEventListener('change', (e) => {
    e.preventDefault()
    handleImageUpload(e);

})

window.onload = () => {
    wait(1000);
    startupAudio.play();
}

function handleImageUpload(event) {

    var imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    imageCompression(imageFile, options)
        .then(function (compressedFile) {
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            return uploadToServer(compressedFile); // write your own logic
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function uploadToServer(file) {
    var fd = new FormData();
    fd.append('fname', 'image.jpg');
    fd.append('data', file);
    $.ajax({
        type: 'POST',
        url: '/api/photo',
        data: fd,
        processData: false,
        contentType: false
    }).done(function (data) {
        detectAndCompute();
        messageTwo.textContent = data.toString();
        console.log(data);
    });
}

function detectAndCompute() {
    messageOne.textContent = " "
    loadBar.style.opacity = 100
    var loading = new SpeechSynthesisUtterance("Loading, Please wait few seconds.");
    window.speechSynthesis.speak(loading);
    fetch('/detect').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loadBar.style.opacity = 0
                messageOne.textContent = data.error
                messageTwo.textContent = " "
                var msg = new SpeechSynthesisUtterance(data.error);
                window.speechSynthesis.speak(msg);
                console.log(data.error)
            } else {
                loadBar.style.opacity = 0
                messageOne.textContent = data.notes
                messageTwo.textContent = " "
                console.log(data.notes)
                var msg = new SpeechSynthesisUtterance(data.notes);
                window.speechSynthesis.speak(msg);
            }
        })
    })
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}



// Future Features
// window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// if ('SpeechRecognition' in window && voiceFlag) {
//     speech()
// } else {
//     // speech recognition API not supported
// }

// function speech() {
//     const recognition = new window.SpeechRecognition();
//     recognition.start();
//     recognition.onresult = (event) => {
//         const speechToText = event.results[0][0].transcript;
//         console.log("User Said : " + speechToText);
//         if (speechToText.includes("submit")) {
//             console.log("yes");
//             $("input").trigger("click");
//         } else
//             console.log("yes");
//     }
// }