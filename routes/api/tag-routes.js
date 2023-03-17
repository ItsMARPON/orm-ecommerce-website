const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// get all tags and associated Product data
router.get("/", async (req, res) => {
  try {
    const allTagsData = await Tag.findAll(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products_tags" }],
    });
    res.status(200).json(allTagsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a single tag by it's `id` and associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products_tags" }],
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

/* req.body should look like this...
"id": 1,
"tag_name": "rock music",
"products_tags": [
{
"id": 1,
"product_name": "Plain T-Shirt",
"price": 15,
"stock": 14,
"category_id": 1,
"product_tag": {
"id": 3,
"product_id": 1,
"tag_id": 8,
"productId": 1
}
}
*/

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
router.put("/:id", async (req, res) => {
  try{
   const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(tagData);   
  }catch(err){
  res.status(500).json(err);
  }
} 
);

// delete on tag by its `id` value
// Note tag_id is a foreign key, it should not be deleted
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
