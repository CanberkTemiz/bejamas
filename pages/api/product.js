import connectDB from "../../middleware/mongodb";
import Product from "../../models/product";

const handler = async (req, res) => {
  try {
    const options = {
      page: Number(req.query.page || 1),
      limit: 6,
    };

    const mongoQuery = { featured: false };

    if (req.query.category) {
      mongoQuery.category = { $in: req.query.category.split(",") };
    }

    if (req.query.price) {
      const price = req.query.price.split("-");

      if (price.length === 1) {
        mongoQuery.price = { $gt: Number(price[0]) };
      } else {
        mongoQuery.price = { $gte: Number(price[0]), $lte: Number(price[1]) };
      }
    }

    if (req.query.sort) {
      options.sort = { [req.query.sort]: req.query.asc || 1 };
    }
    const result = await Product.paginate(mongoQuery, options);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

export default connectDB(handler);
