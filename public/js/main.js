console.log('Client side javascript file is loaded!')

const imageForm = document.querySelector('form')
const messageOne = document.querySelector('#result')
const startupAudio = document.querySelector('audio')

var voiceFlag = false;


// JQuery code for the file upload dialog
$(document).ready(() => {

    $('#uploadForm').submit(function () {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({

            error: (xhr) => {
                status('Error: ' + xhr.status);
            },

            success: (response) => {
                $("#status").empty().text(response);
                console.log(response);
                voiceFlag = true;

            }
        });
        //Very important line, it disables the page refresh.
        return false;
    });
});


window.onload = () => {
    wait(1000);
    startupAudio.play();
}


detectAndCompute();


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


function detectAndCompute() {

    imageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        messageOne.textContent = "Loading...."
        var loading = new SpeechSynthesisUtterance("Loading, Please wait few seconds.");
        window.speechSynthesis.speak(loading);
        wait(1000);
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

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}