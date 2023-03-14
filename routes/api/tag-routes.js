const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// get all tags and associated Product data
router.get("/", async (req, res) => {
  try {
    const allTagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single tag by it's `id` and associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tag found with that id" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
