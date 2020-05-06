const path = require('path')
const express = require('express')
const multer = require("multer");

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const imageCompressionPath = path.join(__dirname, '../node_modules/browser-image-compression/dist/')


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, "image.jpg");
    }
});
var upload = multer({
    storage: storage
}).any()

app.use(express.static(publicDirectoryPath))
app.post('/api/photo', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
app.get('/detect', callDetect);
app.get('/detect-debug', callDetectDebug);
app.use('/image-compression', express.static(imageCompressionPath));
app.listen(port, () => {
    console.log('server running at ' + port)
})



function callDetectDebug(req, res) {
    var datetime = new Date();
    console.log("Detect and compute service ran at : " + datetime);
    var spawn = require("child_process").spawn;
    var process = spawn('python3', ["src/python-app/detect-debug.py"]);
    process.stdout.on('data', function (data) {
        res.send({
            notes: data.toString()
        });
    })
}



function callDetect(req, res) {
    var datetime = new Date();
    console.log("Detect and compute service ran at : " + datetime);
    var spawn = require("child_process").spawn;
    var process = spawn('python3', ["src/python-app/detect.py"]);
    process.stdout.on('data', function (data) {
        res.send({
            notes: data.toString()
        });
    })
}