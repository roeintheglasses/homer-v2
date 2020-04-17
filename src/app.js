const path = require('path')
const express = require('express')
const multer = require("multer");

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

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
}).single('userPhoto');

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

function callDetect(req, res) {
    console.log("Detect and compute service ran.")
    var spawn = require("child_process").spawn;
    var process = spawn('python3', ["src/python-app/detect.py"]);
    process.stdout.on('data', function (data) {
        res.send({
            notes: data.toString()
        });
    })
}


app.listen(port, () => {
    console.log('server running at ' + port)
})