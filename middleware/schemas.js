import Joi from "joi";

export const userSchemas = {
  body: {
    validRegistration: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required().messages({
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username cannot exceed {#limit} characters",
      }),
      phoneNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
          "string.pattern.base": "Invalid Phone Number",
        }),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required()
        .messages({
          "string.email": "Email should be a valid email",
          "string.empty": "Email cannot be empty",
          "any.required": "Email is Required",
        }),
      password: Joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must be at least {#limit} characters long",
      }),
    }),
    validLogin: Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .messages({
          "string.empty": "Email Cannot be Empty",
          "any.required": "Email is required",
        }),
      password: Joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must be at least {#limit} characters long",
      }),
    }),
    validUpdate: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30),
      phoneNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
          "string.pattern.base": "Invalid phone number format",
        }),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must be at least {#limit} characters long",
      }),
    }),
    validResetPassword: Joi.object().keys({
      token: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/)
        .required()
        .messages({
          "string.empty": "Token cannot be empty",
          "any.required": "Token is required",
        }),
      newPassword: Joi.string().min(8).max(16).required().messages({
        "string.empty": "New password cannot be empty",
        "any.required": "New password is required",
        "string.min": "New password must be at least {#limit} characters long",
        "string.max": "New password cannot exceed {#limit} characters",
      }),
    }),
    validVerifyOtp: Joi.object().keys({
      otp: Joi.string().required(),
      number: Joi.string()
        .pattern(/^\+91[6-9]\d{9}$/)
        .messages({
          "string.pattern.base": "Invalid Phone Number",
        }),
    }),
  },
  params: {
    validId: Joi.object().keys({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
  query: {
    // Define query validations here if needed
  },
};

export const categorySchemas = {
  body: {
    ValidCreateCategory: Joi.object().keys({
      categoryName: Joi.string().required().messages({
        "string.empty": "Category name cannot be empty",
        "any.required": "Category name is required",
      }),
    }),
    ValidUpdateCategory: Joi.object().keys({
      categoryName: Joi.string().required().messages({
        "string.empty": "Category name cannot be empty",
        "any.required": "Category name is required",
      }),
    }),
  },
  params: {
    ValidCategoryId: Joi.object().keys({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid category ID format",
          "string.empty": "Category ID cannot be empty",
          "any.required": "Category ID is required",
        }),
    }),
  },
};

export const productSchemas = {
  body: {
    ValidCreateProduct: Joi.object().keys({
      productName: Joi.string().required().messages({
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required",
      }),
      description: Joi.string().required().messages({
        "string.empty": "Description cannot be empty",
        "any.required": "Description is required",
      }),
      productDetails: Joi.string().required().messages({
        "string.empty": "Product details cannot be empty",
        "any.required": "Product details are required",
      }),
      price: Joi.number().required().messages({
        "number.base": "Price should be a number",
        "any.required": "Price is required",
      }),
      color: Joi.string().required().messages({
        "string.empty": "Color cannot be empty",
        "any.required": "Color is required",
      }),
      categoryId: Joi.array()
        .items(Joi.string().hex().length(24))
        .required()
        .messages({
          "array.base": "Category ID should be an array of valid ObjectIds",
          "any.required": "Category ID is required",
        }),
    }),
    ValidUpdateProduct: Joi.object().keys({
      productName: Joi.string().required().messages({
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required",
      }),
      color: Joi.string().required().messages({
        "string.empty": "Color cannot be empty",
        "any.required": "Color is required",
      }),
    }),
  },
  params: {
    ValidProductId: Joi.object().keys({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid product ID format",
          "string.empty": "Product ID cannot be empty",
          "any.required": "Product ID is required",
        }),
    }),
  },
  query: {
    ValidListRequest : Joi.object().keys({
      search:Joi.string(),
      page:Joi.number(),
      limit:Joi.number(),
      sortBy:Joi.string(),
      sortOrder:Joi.string(),
    })


  },
  filesSchema: Joi.array().items(
    Joi.object().keys({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      buffer: Joi.binary().required(),
      size: Joi.number().required(),
    })
  ),
};
