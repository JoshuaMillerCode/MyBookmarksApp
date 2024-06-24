const Category = require('../models/Category.js');

module.exports = {
  index,
  getByName,
};

async function index(req, res) {
  try {
    const categories = await Category.find({}, 'name');

    if (categories) {
      res.status(200).send(categories);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getByName(req, res) {
  try {
    const category = await Category.findByName(req.params.name).populate(
      'bookmarks'
    );

    if (category) {
      res.status(200).send(category);
    } else {
      throw 'Resource Not Found';
    }
  } catch (err) {
    res.status(400).send(err);
  }
}
