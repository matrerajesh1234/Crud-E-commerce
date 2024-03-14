import * as categoriesServices from "../services/categoriesServices.js";

export const newCategories = async (req, res, next) => {
  try {
    const { name } = req.body;
    const checkName = await categoriesServices.findCategorieOne({ name });

    if (checkName) {
      return res.status(401).json({
        Message: "Categorie Already Exists",
      });
    }

    const categorieData = await categoriesServices.createCategorie(req.body);

    if (!categorieData) {
      return res.status(200).json({
        message: "categories adding process falied",
      });
    }

    return res.status(200).json({
      Message: "Categories Created Succesfully",
      categorieData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const listAllCategorie = async (req, res, next) => {
  try {
    const categorieData = await categoriesServices.listAllCategorie();
    if (!categorieData) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    return res.status(200).json({
      message: "Fetching all categoires from Database",
      categorieData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findOneCategorie = async (req, res, next) => {
  const checkCategorie = await categoriesServices.findCategorieOne({
    id: req.body.id,
  });

  if (!checkCategorie) {
    return res.status(400).json({
      message: "checkCategorie Not Found",
    });
  }

  return res.status(200).json({
    message: "Succesfully Fetched",
    checkCategorie,
  });
};

export const updateCategorie = async (req, res, next) => {
  try {
    const checkCategorie = await categoriesServices.findCategorieOne({
      id: req.body.id,
    });

    if (!checkCategorie) {
      return res.status(400).json({
        message: "categories Not Found",
      });
    }

    const updatedCategoriesData = await categoriesServices.updateCategorie(
      { _id: checkCategorie },
      req.body
    );

    if (!updatedCategoriesData) {
      return res.status(401).json({
        Message: "Please Enter Data to be Update",
      });
    }

    return res.status(200).json({
      message: "Update Categorie Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteCategorie = async (req, res, next) => {
  try {
    const checkCategorie = await categoriesServices.findCategorieOne({
      id: req.body.id,
    });

    if (!checkCategorie) {
      return res.status(400).json({
        message: "checkCategorie Not Found",
      });
    }

    const deleteCategorieData = await categoriesServices.deleteCategorie({
      id: req.body.checkCategorie,
    });

    return res.status(200).json({
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};
