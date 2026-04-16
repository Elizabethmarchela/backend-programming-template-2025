/* eslint-disable no-console */
const mongoose = require('mongoose');

const Reward = mongoose.model('rewards');
const GachaLog = mongoose.model('gacha_logs');

async function countUserGachaToday(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return GachaLog.countDocuments({
    user_id: userId,
    created_at: { $gte: start, $lte: end },
  });
}

async function getRewards() {
  return Reward.find({});
}

async function updateRewardQuota(rewardId) {
  return Reward.updateOne({ _id: rewardId }, { $inc: { kuota: -1 } });
}

async function createGachaLog(userId, prizeName, isWin) {
  return GachaLog.create({
    user_id: userId,
    prize_name: prizeName,
    is_win: isWin,
    created_at: new Date(),
  });
}

async function getAllWinners() {
  return GachaLog.find({ is_win: true }).populate({
    path: 'user_id',
    select: 'full_name',
    model: 'Users',
  });
}

async function getHistoryByUserId(userId) {
  return GachaLog.find({ user_id: userId }).sort({ created_at: -1 });
}

module.exports = {
  countUserGachaToday,
  getRewards,
  updateRewardQuota,
  createGachaLog,
  getAllWinners,
  getHistoryByUserId,
};
