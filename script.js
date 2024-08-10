const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
});

const upload = multer({ storage: storage });

// Handle form submission
app.post('/generate-card', upload.single('photo'), (req, res) => {
    const { name, dob, fathersName, address } = req.body;
    const photo = req.file.path;
    
    // Here, you'd generate the Aadhar card image or PDF
    // For simplicity, we'll just send a response for now
    
    res.send(`Aadhar card for ${name} generated!`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
