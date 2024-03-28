import jwt from "jsonwebtoken";

export const paginationAndSorting = (query, defaultSorting) => {
  const { page, limit, sortBy, sortOrder } = query;

  const pageCount = Number(page) || 1;
  const limitCount = Number(limit) || 10;
  const sortFiled = sortBy || defaultSorting;
  const sortOrderValue = sortOrder === "asc" ? 1 : -1;

  const skip = (pageCount - 1) * limitCount;
  const sorting = { [sortFiled]: sortOrderValue };
  return {
    page,
    skip,
    limitCount,
    sorting,
  };
};

export const search = (search, fields) => {
  if (search) {
    const searchArray = fields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
      // Spread the regex properties her
    }));
    return { $or: searchArray };
  }

  return {};
};

export const getJWTToken = (id, SECRET, expire) => {
  return jwt.sign({ _id: id }, SECRET, { expiresIn: expire });
};

export const sendToken = (token, SECRET) => {
  return jwt.verify(token, SECRET);
};
