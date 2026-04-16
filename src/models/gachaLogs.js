module.exports = (db) =>
  db.model(
    'gacha_logs',
    new db.Schema(
      {
        user_id: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        prize_name: {
          type: String,
          required: true,
        },
        is_win: {
          type: Boolean,
          required: true,
          default: false,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
      { collection: 'gacha_logs' }
    )
  );
