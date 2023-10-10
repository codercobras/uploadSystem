const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('userDocument'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
