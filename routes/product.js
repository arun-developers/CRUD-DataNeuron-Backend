const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const Joi = require("joi");
const validateReqSchema = require("../middleware/validateReqSchema");

const getProductSchema = Joi.object({
  uuids: Joi.string(),
  author: Joi.string(),
});

const createProductSchema = Joi.object({
  title:Joi.string().required(),
  author: Joi.string().required(),
  content:Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  contact: Joi.string().min(10).max(10).required(),
});

const updateProductSchema = Joi.object({
  uuid: Joi.string().required(),
  title:Joi.string(),
  author: Joi.string(),
  content:Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  contact: Joi.string().min(10).max(10),
});

const deleteProductSchema = Joi.object({
  uuid: Joi.string().required(),
});

router.route("/").get(validateReqSchema(getProductSchema), getProduct);
router
  .route("/create")
  .post(validateReqSchema(createProductSchema), createProduct);
router
  .route("/update")
  .put(validateReqSchema(updateProductSchema), updateProduct);
router
  .route("/delete")
  .delete(validateReqSchema(deleteProductSchema), deleteProduct);

module.exports = router;
