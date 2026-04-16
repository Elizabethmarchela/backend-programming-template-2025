/* eslint-disable no-underscore-dangle */
const gachaRepository = require('./gacha-repository');

function maskNameRandomly(name) {
  if (!name) return 'Anonymous';
  return name
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      return Math.random() < 0.6 ? '*' : char;
    })
    .join('');
}

async function playGacha(userId) {
  const dailyCount = await gachaRepository.countUserGachaToday(userId);
  if (dailyCount >= 5) {
    const error = new Error('DAILY_LIMIT_EXCEEDED');
    error.status = 422;
    throw error;
  }

  const rewards = await gachaRepository.getRewards();
  const availableRewards = rewards.filter((r) => Number(r.kuota) > 0);

  let wonPrize = null;

  if (availableRewards.length > 0 && Math.random() < 0.2) {
    const randomIndex = Math.floor(Math.random() * availableRewards.length);
    const selectedReward = availableRewards[randomIndex];

    if (selectedReward && selectedReward._id) {
      wonPrize = selectedReward;
      await gachaRepository.updateRewardQuota(selectedReward._id);
    }
  }

  const history = await gachaRepository.createGachaLog(
    userId,
    wonPrize ? wonPrize.nama_hadiah : 'Zonk',
    !!wonPrize
  );

  return history;
}

async function getWinners() {
  const winners = await gachaRepository.getAllWinners();

  return winners.map((w) => {
    const fullName = w.user_id ? w.user_id.full_name : 'Anonymous';

    return {
      prize_name: w.prize_name,
      winner_name: maskNameRandomly(fullName),
      won_at: w.created_at,
    };
  });
}

async function getHistory(userId) {
  return gachaRepository.getHistoryByUserId(userId);
}

async function getRewards() {
  const rewards = await gachaRepository.getRewards();
  return rewards.map((r) => ({
    id: r._id,
    nama_hadiah: r.nama_hadiah,
    sisa_kuota: r.kuota,
  }));
}

module.exports = {
  playGacha,
  getWinners,
  getHistory,
  getRewards,
};
