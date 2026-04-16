const gachaService = require('./gacha-service');

async function playGacha(req, res, next) {
  try {
    const { userId } = req.body;
    const result = await gachaService.playGacha(userId);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const winners = await gachaService.getWinners();
    return res.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(req, res, next) {
  try {
    const { id } = req.params;
    const history = await gachaService.getHistory(id);
    return res.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getRewards(req, res, next) {
  try {
    const rewards = await gachaService.getRewards();
    return res.status(200).json(rewards);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  playGacha,
  getWinners,
  getHistory,
  getRewards,
};
