import productModel from "../models/productModel.js";

export const createProduct = async (productData) => {
  return await productModel.create(productData);
};

export const listAllProduct = async () => {
  return await productModel.find();
};

export const findProductOne = async (filter, option = {}) => {
  const dataFilter = {
    ...filter,
    isActive: true,
    isDeleted: false,
  };
  return await productModel.findOne(dataFilter, option);
};

export const findProductById = async (productId) => {
  const dataFilter = {
    ...productId,
    isActive: true,
    isDeleted: false,
  };

  return await productModel.findById(dataFilter);
};

export const updateProduct = async (productId, productData) => {
  return await productModel.findOneAndUpdate(productId, productData, {
    new: true,
  });
};

export const deleteProduct = async (productData) => {
  return await productModel.findOneAndDelete(productData);
};

export const executeAggregation = async (pagination, searching) => {
  const { skip, limitCount, sorting } = pagination;
  const totalCount = await productModel.countDocuments(searching);

  const data = await productModel.aggregate(
    [
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      
      {
        $match: { ...searching, isDeleted: false, isActive: true },
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          imageUrl: 1,
          description: 1,
          productDetails: 1,
          price: 1,
          color: 1,
          isActive: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          categoryName: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limitCount,
      },
      {
        $sort: sorting,
      },
    ],
    { collation: { locale: "en" } }
  );

  const totalPage = Math.ceil(totalCount / limitCount);

  return {
    list: data,
    page: pagination.page,
    limit: limitCount,
    totalRecords: totalCount,
    totalPage: totalPage,
  };
};
