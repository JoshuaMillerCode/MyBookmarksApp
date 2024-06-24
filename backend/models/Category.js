const { Schema, model } = require('../config/db-connection.js');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
});

categorySchema.statics.findByName = function (name) {
  return this.findOne({ name: name });
};

module.exports = model('Category', categorySchema);
