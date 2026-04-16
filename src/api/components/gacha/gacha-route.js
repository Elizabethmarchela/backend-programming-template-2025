const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/play', gachaController.playGacha);
  route.get('/winners', gachaController.getWinners);
  route.get('/history/:id', gachaController.getHistory);
  route.get('/rewards', gachaController.getRewards);
};
