import productModel from "../models/productModel.js";
import { paginatedResponse } from "../utils/services.js";

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

  const data = await productModel.aggregate(
    [
      {
        $lookup: {
          from: "imageproducts",
          localField: "_id",
          foreignField: "productId",
          as: "images",
        },
      },
      {
        $lookup: {
          from: "productcategoryrelations",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$productId", "$$productId"],
                },
              },
            },
            {
              $lookup: {
                from: "categories",
                let: { categoryId: "$categoryId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$categoryId"],
                      },
                    },
                  },
                  {
                    $project: {
                      id: 1,
                      categoryName: 1,
                    },
                  },
                ],
                as: "category",
              },
            },
            {
              $project: {
                id: 1,
                categoryName: { $arrayElemAt: ["$category.categoryName", 0] },
              },
            },
          ],
          as: "productCatelogRelation",
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
          category: "$productCatelogRelation",
            image: {
              $map: {
                input: "$images",
                as: "productImage",
                in: {
                  id: "$$productImage._id",
                  url: {
                    $concat: [process.env.BASEURL, "$$productImage.imageUrl"],
                  },
                },
              },
            },
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

  return data;
};

export const filterPagination = async (filter) => {
  const filterData = await productModel.aggregate([
    {
      $lookup: {
        from: "productcategoryrelations",
        let: { productId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$productId", "$$productId"],
              },
            },
          },
          {
            $lookup: {
              from: "categories",
              let: { categoryId: "$categoryId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$categoryId"],
                    },
                  },
                },
                {
                  $project: {
                    id: 1,
                    categoryName: 1,
                  },
                },
              ],
              as: "category",
            },
          },
          {
            $project: {
              id: 1,
              categoryName: { $arrayElemAt: ["$category.categoryName", 0] },
            },
          },
        ],
        as: "productCatelogRelation",
      },
    },
    {
      $match: { ...filter, isDeleted: false },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);

  const totalRecords = filterData.length;
  return {
    totalRecords,
  };
};
