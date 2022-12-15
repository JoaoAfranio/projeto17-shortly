import schemas from "../schemas/schemas.js";

export function schemaValidation(validator) {
  if (!schemas.hasOwnProperty(validator)) throw new Error(`${validator} validator is not exist`);

  return async function (req, res, next) {
    const body = req.body;

    const { error } = schemas[validator].validate(body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    next();
  };
}
