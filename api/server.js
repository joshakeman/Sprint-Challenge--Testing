const express = require('express');

const Games = require('../games/gamesModel.js');


const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
  const games = await Games.getAll();

  res.status(200).json(games);
});

// server.post('/games', async (req, res) => {
//     const rows = await hobbits.getAll();
  
//     res.status(200).json(rows);
//   });

  server.post('/games', (req, res) => {
    
        Games.insert(req.body)
        .then(game => {
            res.status(200).json(game)
        }, (err) => {
            res.status(422).send()
          });  
  });

module.exports = server;
