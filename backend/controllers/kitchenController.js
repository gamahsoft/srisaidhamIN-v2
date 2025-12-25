import asyncHandler from "../middleware/asyncHandler.js";
import Kitchen from "../models/kitchenModel.js";

// @desc Fetch all products
// @route GET /api/services
// @access Public
const getServices = asyncHandler(async (req, res) => {
  //Pagination Logic
  const pageSize = process.env.PAGINATION_LIMIT;
  //Get page number from query string. If not there then use 1 default
  const page = Number(req.query.pageNumber) || 1;

  //This is how you get the keyword from the query string.
  // regex for not exact search (iph will find iphone)
  //options is for case insensitive search
  const keyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  //Count the total number of products
  const count = await Kitchen.countDocuments({ ...keyword });
  // console.log("Document count1: ", count);
  //Limit the products sent to UI based on the pagesize
  //skip is for showing next set of products on the next page etc.
  const kitchenmenu = await Kitchen.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ kitchenmenu, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch all menu items served in kitchen
// @route GET /api/products
// @access Public
const getAllMenuItems = asyncHandler(async (req, res) => {
  // console.log("getAllMenuItems: Finally here");
  //Pagination Logic
  const pageSize = 50;
  //Get page number from query string. If not there then use 1 default
  const page = Number(req.query.pageNumber) || 1;
  // console.log("Number of pages: ", page);
  //Count the total number of products
  // const count = await Product.countDocuments({ ...keyword })
  const count = await Kitchen.countDocuments({ category: "kitchen" });
  // console.log("Document count: ", count);
  //Limit the products sent to UI based on the pagesize
  //skip is for showing next set of products on the next page etc.
  // const products = await Product.find({ ...keyword })
  const kitchenmenu = await Kitchen.find({ category: "kitchen" })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // console.log("Kitchen menu items: ", kitchenmenu);

  res.json({ kitchenmenu, page, pages: Math.ceil(count / pageSize) });
  // res.json(products);
});

// @desc Fetch product using id
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const kitchenmenu = await Kitchen.findById(req.params.id);

  if (kitchenmenu) {
    res.json(kitchenmenu);
  } else {
    res.status(404);
    throw new Error("Kitchen Menu not found");
  }
});

// @desc Delete a product by Id
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const kitchenmenu = await Kitchen.findById(req.params.id);

  if (kitchenmenu) {
    await kitchenmenu.remove();
    res.json({ message: "kitchen menu item removed" });
  } else {
    res.status(404);
    throw new Error("kitchen menu not found");
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const kitchenmenu = new Kitchen({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    numReviews: 0,
    description: "Sample description",
  });

  const createdMenu = await kitchenmenu.save();

  res.status(201).json(createdMenu);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } = req.body;

  const kitchenmenu = await Kitchen.findById(req.params.id);

  if (kitchenmenu) {
    kitchenmenu.name = name;
    kitchenmenu.price = price;
    kitchenmenu.description = description;
    kitchenmenu.image = image;
    kitchenmenu.brand = brand;
    kitchenmenu.category = category;

    const updatedMenu = await kitchenmenu.save();

    res.status(201).json(updatedMenu);
  } else {
    res.status(404);
    throw new Error("kitchen menu not found");
  }
});

// @desc   Create new review
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const kitchenmenu = await Kitchen.findById(req.params.id);

  if (kitchenmenu) {
    const alreadyReviewed = kitchenmenu.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("kitchen menu already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      kitchenmenu.reviews.push(review);
      kitchenmenu.numReviews = kitchenmenu.reviews.length;
      kitchenmenu.rating =
        kitchenmenu.reviews.reduce((acc, item) => item.rating + acc, 0) /
        kitchenmenu.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
const getSaiServices = asyncHandler(async (req, res) => {
  //sort of accending order rating: -1
  // const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  //Count the total number of products
  // const count = await Product.countDocuments({ brand: "baba" });

  const kitchenmenu = await Kitchen.find({ brand: "baba" }).sort({ name: 1 });

  res.json(kitchenmenu);
});

export {
  getServices,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getSaiServices,
  getAllMenuItems,
};
