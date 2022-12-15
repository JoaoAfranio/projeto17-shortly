import joi from "joi";

export const register = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export const login = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
