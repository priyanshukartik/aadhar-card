const { createCanvas, loadImage } = require('canvas');

app.post('/generate-card', upload.single('photo'), (req, res) => {
    const { name, dob, fathersName, address } = req.body;
    const photoPath = req.file.path;

    const canvas = createCanvas(500, 300);
    const ctx = canvas.getContext('2d');

    // Load template image and user photo
    loadImage('path-to-card-template.png').then((template) => {
        ctx.drawImage(template, 0, 0, 500, 300);

        // Load user photo
        loadImage(photoPath).then((img) => {
            ctx.drawImage(img, 20, 20, 100, 100);
            
            // Add text to the card
            ctx.font = '20px Arial';
            ctx.fillText(name, 150, 50);
            ctx.fillText(dob, 150, 80);
            ctx.fillText(fathersName, 150, 110);
            ctx.fillText(address, 150, 140);
            
            const buffer = canvas.toBuffer('image/png');
            res.type('png');
            res.send(buffer);
        });
    });
});
