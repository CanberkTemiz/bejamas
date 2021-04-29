import connectDB from "../../middleware/mongodb";
import Product from "../../models/product";

const handler = async (req, res) => {
  try {
    const options = {
      page: Number(req.query.page || 1),
      limit: 6,
    };

    console.log("product", req.query);

    const mongoQuery = { featured: false };

    if (req.query.category) {
      mongoQuery.category = { $in: req.query.category.split(",") };
    }

    if (req.query.sort) {
      options.sort = { [req.query.sort]: req.query.asc || 1 };
    }

    const result = await Product.paginate(mongoQuery, options);

    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

export default connectDB(handler);
