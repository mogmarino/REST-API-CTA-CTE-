import Product from "../models/Product";

export const createProduct = async (req, res) => {
  console.log(req.body);
  const { name, category, price, imageURL } = req.body;
  const newProduct = new Product({ name, category, price, imageURL });

  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const prod = await Product.findById(req.params.productId);
  res.status(200).json(prod);
};

export const updateProductById = async (req, res) => {
  const updatedProd = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProd);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json();
};
