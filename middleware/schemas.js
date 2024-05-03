import Joi from "joi";

export const userSchemas = {
  body: {
    validRegistration: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      phoneNumber: Joi.string().pattern(/^[6-9]\d{9}$/),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().min(8).required(),
    }),
    validLogin: Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().min(8).required(),
    }),
    validUpdate: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30),
      phoneNumber: Joi.string().pattern(/^[6-9]\d{9}$/),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().min(8).required(),
    }), 
    validVerifyOtp: Joi.object().keys({
      // Define the schema for validating OTP verification
    }),
  },
  params: {
    validId: Joi.object().keys({
      id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    }),
  },
  query: {
    // Define query validations here if needed
  },
};