'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const {Poll} = require('./models')
const {DATABASE_URL} = require ('./config');


const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());
mongoose.Promise = global.Promise;


// API endpoints go here!

app.get("/api/polls", (req, res) => {
  
    Poll
        .find().then(polls => {
          console.log('bang')  
            res.json(polls.map(poll => {
                return poll.apiReper()
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'our apologies, something went wrong'})
        })
})

app.post('/api/polls', (req, res) => {
    
    req.check('choice-one', 'invalid choice').isLength({min: 1});
    req.check('choice-two', 'invalid choice').isLength({min: 1});
    req.check('poll-question', 'invalid question').isLength({min: 5});
    req.check('poll-choices', 'invalid number of choices').isLength({min: 2});

    Poll
        .create({
           poll: {
               text: req.body.text,
               title: req.body.text,
               choices: [{
                   choice: req.body.choice,
                   vote: req.body.vote
               }]

           } 
        })


})
// Serve the built client

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/public', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
