import * as productServices from "../services/productServices.js";

export const newProduct = async (req, res, next) => {
  try {
    const { productName } = req.body;
    const checkProduct = await productServices.findProductOne({ productName });

    if (checkProduct) {
      return res.status(401).json({
        Message: "product Already Exists",
      });
    }

    const productData = await productServices.createProduct(req.body);

    if (!productData) {
      return res.status(200).json({
        message: "Product adding process falied",
      });
    }
    return res.status(200).json({
      Message: "Product Created Succesfully",
      productData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const listAllProduct = async (req, res, next) => {
  try {
    const productData = await productServices.listAllProduct();

    if (!productData) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    return res.status(200).json({
      message: "Fetching all product from Database",
      productData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findOneProduct = async (req, res, next) => {
  const checkProduct = await productServices.findProductOne({
    id: req.body.id,
  });

  if (!checkProduct) {
    return res.status(400).json({
      message: "Product Not Found",
    });
  }

  return res.status(200).json({
    message: "Succesfully Fetched",
    checkProduct,
  });
};

export const updateProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.findProductOne({
      id: req.body.id,
    });

    if (!checkProduct) {
      return res.status(400).json({
        message: "Product Not Found",
      });
    }

    const updatedProductData = await productServices.updateProduct(
      { _id: checkProduct },
      req.body
    );

    if (!updatedProductData) {
      return res.status(401).json({
        Message: "Please Enter Data to be Update",
      });
    }

    return res.status(200).json({
      message: "Updated Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.deleteProduct({
      id: req.body.id,
    });

    if (!checkProduct) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const deletedProductData = await productServices.deleteProduct({
      id: req.body.checkProduct,
    });

    return res.status(200).json({
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};
