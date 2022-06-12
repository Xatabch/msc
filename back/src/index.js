const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        console.log('filename');
        cb(null, file.originalname);
    },
    destination: function (req, file, cb) {
        console.log('storage');
        cb(null, './music')
    }
});
const upload = multer({ storage });

const musicFolder = './music';

const app = express();

app.use(cors())

app.get('/ping', (req, res) => {
    res.status(200).send('kek');
});

app.get('/track-list', (req, res) => {
    const tracks = [];
    fs.readdir(musicFolder, (err, files) => {
        files.forEach(file => {
            tracks.push(file);
        });

        res.status(200).send({
            'tracks': tracks
        });
    });
});

app.post('/upload_files', upload.single('file'), (req, res) => {
    console.log(req.body, req.file);
    res.send({ message: 'Succesfully uploaded files' });
})

app.get('/track/:name', (req, res) => {
    const fileName = req.params.name;
    let filePath = `./music/${fileName}`;

    fs.exists(filePath, (exists) => {
        if (exists) {
            const rstream = fs.createReadStream(filePath);
            rstream.pipe(res);

        } else {
            res.send('Error - 404');
            res.end();
        }
    });
});

app.listen(8000, () => {
    console.log(`server listening on port 8000`);
});