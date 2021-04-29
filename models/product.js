import mongoose from "mongoose";
import moogoosePaginate from "mongoose-paginate-v2";

var Schema = mongoose.Schema;

const product = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: String,
  },
  currency: {
    type: String,
  },
  image: {
    type: String,
  },
  bestseller: {
    type: Boolean,
  },
  featured: {
    type: Boolean,
  },
  details: {
    type: String,
  },
});

product.plugin(moogoosePaginate);

mongoose.models = {};

var Product = mongoose.model("Product", product);

export default Product;
