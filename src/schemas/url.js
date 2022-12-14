import joi from "joi";

export const insert = joi.object({
  url: joi.string().required(),
});
