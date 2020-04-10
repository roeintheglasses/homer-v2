const path = require('path')
const express = require('express')
const multer = require("multer");
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, "image.jpg");
    }
});

var upload = multer({
    storage: storage
}).single('userPhoto');

app.use(express.static(publicDirectoryPath))
app.post('/api/photo', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


app.get('/name', callDetect);

function callDetect(req, res) {
    console.log("Detect and compute running!!")
    var spawn = require("child_process").spawn;
    var process = spawn('python3', ["python-app/detect.py"]);
    process.stdout.on('data', function (data) {
        res.send({
            notes: data.toString()
        });
    })
}

app.listen(port, function () {
    console.log("Working on port: " + port + "!!");
});