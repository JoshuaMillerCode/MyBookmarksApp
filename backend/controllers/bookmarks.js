const Bookmark = require('../models/Bookmark.js');
const Category = require('../models/Category.js');

async function index(req, res) {
  try {
    let bookmarks = await Bookmark.find({}).populate('category');

    if (req.query.category) {
      bookmarks = bookmarks.filter(
        (b) =>
          b?.category?.name.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    if (bookmarks) {
      res.status(200).send(bookmarks);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function create(req, res) {
  try {
    //Variable the category will be assigned to
    let category;

    // Check if client sent a category with the body
    if (req.body.category) {
      //Try to find that category with custom static method
      const foundCategory = await Category.findByName(req.body.category);

      //Check if it exists
      if (foundCategory) {
        // If if does, just take that _id and attach to body
        req.body.category = foundCategory._id;

        category = foundCategory;
      } else {
        // If not, create a new category and attach _id to body
        const createdCategory = await Category.create({
          name: req.body.category,
        });

        req.body.category = createdCategory._id;

        category = createdCategory;
      }
    }

    // req.body will have the info that the user filled out on the frontend
    const createdBookmark = await Bookmark.create(req.body);

    // Attach bookmark to category
    if (category) {
      await Category.findByIdAndUpdate(category._id, {
        $addToSet: {
          bookmarks: createdBookmark._id,
        },
      });
    }

    if (createdBookmark) {
      res.status(201).send(createdBookmark);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function destroy(req, res) {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (deletedBookmark) {
      res.status(201).send(deletedBookmark);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create,
  destroy,
};
