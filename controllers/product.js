const Product = require("../model/product");

const createProduct = async (req, res) => {
  try {
    let PAYLOAD = req.body;

    const CreatedProduct = new Product(PAYLOAD);
    await CreatedProduct.save();
    return res.json(CreatedProduct);
  } catch (Exception) {
    console.log(Exception);
    return res.status(500).json({ messsage: Exception.toString() });
  }
};

const getProduct = async (req, res) => {
  try {
    let QUERY = req.query;
    let where = {};
    let sortBy = {};

    if (QUERY.uuids) {
      where._id = { $in: QUERY.uuids.split(",") };
    }
    if (QUERY.title) {
      where.title = { $in: QUERY.title.split(",") };
    }
    if (QUERY.sort) {
      if (QUERY.sort === "des") {
        sortBy.createdAt = -1;
      }
      if (QUERY.sort === "asc") {
        sortBy.createdAt = 1;
      }
    }
    const response = await Product.find(where).sort(sortBy);
    return res.json(response);
  } catch (Exception) {
    console.log(Exception);
    return res.status(500).json({ messsage: Exception.toString() });
  }
};

const updateProduct = async (req, res) => {
  try {
    let QUERY = req.query;
    let PAYLOAD = req.body;

    let foundProduct = await Product.findOne({ _id: QUERY.uuid });

    if (!foundProduct) {
      throw { statusCode: 404, message: `No product found ${QUERY.uuid}` };
    }

    const UpdatedProduct = await Product.findByIdAndUpdate(
      { _id: foundProduct._id },
      { ...PAYLOAD }
    );

    return res.json({ message: "Updated", product: UpdatedProduct });
  } catch (Exception) {
    console.log(Exception);
    return res.status(500).json({ messsage: Exception });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let QUERY = req.query;

    let foundProduct = await Product.findOne({ _id: QUERY.uuid });

    if (!foundProduct) {
      throw { statusCode: 404, message: `No product found ${QUERY.uuid}` };
    }

    let DeletedProduct = await Product.findByIdAndDelete({
      _id: foundProduct._id,
    });

    return res.json({
      statusCode: 200,
      message: `${DeletedProduct._id} product deleted.`,
    });
  } catch (Exception) {
    console.log(Exception);
    return res.status(500).json({ messsage: Exception });
  }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };
