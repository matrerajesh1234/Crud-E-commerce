import { sendResponse } from "../utils/sendResponse.js";

export const validationMiddleware = (bodySchema, paramsSchema, querySchema) => {
  return (req, res, next) => {
    // Validate request body if bodySchema is provided
    if (bodySchema) {
      const { error: bodyError } = bodySchema.validate(req.body, {
        abortEarly: false,
      });
      if (bodyError) {
        const errorMessages = bodyError.details.map((err) => err.message);
        return sendResponse(res, 400, errorMessages);
      }
    }

    // Validate request parameters if paramsSchema is provided
    if (paramsSchema) {
      const { error: paramsError } = paramsSchema.validate(req.params, {
        abortEarly: false,
      });
      if (paramsError) {
        const errorMessages = paramsError.details.map((err) => err.message);
        return sendResponse(res, 400, errorMessages);
      }
    }
    // Validate query parameters if querySchema is provided
    if (querySchema) {
      const { error: queryError } = querySchema.validate(req.query, {
        abortEarly: false,
      });
      if (queryError) {
        const errorMessages = queryError.details.map((err) => err.message);
        return sendResponse(res, 400, errorMessages);
      }
    }

    next();
  };
};
