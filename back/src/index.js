const express = require('express');
const fs = require('fs');
const cors = require('cors');

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