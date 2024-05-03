import { sendResponse } from "../utils/sendResponse.js";

export const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    if (!schema) {
      next();
      return;
    }

    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const errorMessages = error.details.map((err) => err.message);
     res.status(400).json(errorMessages)
    }
  };
};