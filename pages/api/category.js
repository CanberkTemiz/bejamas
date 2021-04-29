import connectDB from "../../middleware/mongodb";
import Product from "../../models/product";

const handler = async (req, res) => {
  try {
    console.log("category", req.query);

    const result = await Product.distinct("category");

    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

export default connectDB(handler);
