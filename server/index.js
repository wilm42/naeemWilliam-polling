'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const {Poll} = require('./models')
const {DATABASE_URL, PORT} = require ('./config');


const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());
mongoose.Promise = global.Promise;


// API endpoints go here!

app.get("/api/polls", (req, res) => {

    console.log('i work')
    Poll
        .find().then(polls => {
            res.json(polls.map(poll => {
                return poll.apiRepr()
            }));
        })
        .catch(err => {
            console.error(err);
            // res.status(500).json({error: 'our apologies, something went wrong'})
        })
})

app.post('/api/polls', (req, res) => {
 
     // req.check('choice-two', 'invalid choice').isLength({min: 1});
    // req.check('poll-question', 'invalid question').isLength({min: 5});
    // req.check('poll-choices', 'invalid number of choices').isLength({min: 2});
    Poll
        .create({
                text: req.body.text,
               title: req.body.title,
               choices: req.body.choices

           }) 
          
        .then(polls => res.status(201).json(polls.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});


app.put('/api/polls/:id', (req, res) => {
    console.log(req.body)
  if (!(req.params.id && req.body.id === req.body.id )) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['text', 'choices', 'vote', 'choice'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

    Poll
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatePoll => res.status(201).json(updatePoll.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));



})

app.delete('/api/polls/:id', (req, res) => {
  Poll
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      console.log(`Deleted driver with id \`${req.params.ID}\``);
      res.status(204).end();
    });
});

// Serve the built client

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/public', 'index.html');
    res.sendFile(index);
});

let server;
// function runServer(port=3001) {
//     return new Promise((resolve, reject) => {
//         server = app.listen(port, () => {
//             resolve();
//         }).on('error', reject);
//     });
// }
function runServer(databaseUrl=DATABASE_URL, port=3001) {
  return new Promise((resolve, reject) => {
      console.log(databaseUrl)
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
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