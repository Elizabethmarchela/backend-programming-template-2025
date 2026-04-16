module.exports = (db) =>
  db.model(
    'rewards',
    new db.Schema({
      nama_hadiah: {
        type: String,
        required: true,
      },
      kuota: {
        type: Number,
        required: true,
        default: 0,
      },
    })
  );
