const express = require('express');  
const bodyParser = require('body-parser');  
const url = require('url');  
const querystring = require('querystring');

let winston = require('winston');

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'test.log'})
    ]
});

let app = express();  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

// Function to handle the root path
app.get('/', async function(req, res) {
    logger.log('info', JSON.stringify(req.query));
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end('Hello World');
});

let server = app.listen(8080, function() {  
    logger.log('info', 'Server is listening on port 8080')
});