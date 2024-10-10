var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204 // For legacy browser support
};

app.use(cors(corsOptions)); // Use the configured CORS options

app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname);

// Variables for url and api key


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));;
});


// POST Route



// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


