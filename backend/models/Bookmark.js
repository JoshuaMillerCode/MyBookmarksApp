const { Schema, model } = require('../config/db-connection.js');

const bookmarkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Bookmark', bookmarkSchema);
