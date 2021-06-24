import { Joi } from "express-validation";

export default {
  create: {
    body: Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      is_active: Joi.boolean().required()
    })
  }
}