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
      token: Joi.string().pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/).required().messages({
        'string.empty': 'Token cannot be empty',
        'any.required': 'Token is required',
    }),
    newPassword: Joi.string().min(8).max(16).required().messages({
      'string.empty': 'New password cannot be empty',
      'any.required': 'New password is required',
      'string.min': 'New password must be at least {#limit} characters long',
      'string.max': 'New password cannot exceed {#limit} characters'
    })
    })
,
    validVerifyOtp: Joi.object().keys({
      otp: Joi.number()
      .integer() // Ensure OTP is an integer (no decimals)
      .min(100000) // Minimum length of 6 digits
      .max(999999) // Maximum length of 6 digits
      .required()
      .messages({
        'number.base': '{{#label}} must be a number',
        'number.integer': '{{#label}} must be an integer (whole number)',
        'number.min': '{{#label}} must be at least 6 digits long',
        'number.max': '{{#label}} must be at most 6 digits long',
        'any.required': '{{#label}} is required',
      }),
      number: Joi.string()
    .pattern(/^\+91[6-9]\d{9}$/)
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    }),
  })
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
