import Joi from "joi";

export function isTimeOffFormValid(data) {
  const schema = Joi.object({
    type: Joi.string()
      .required()
      .valid("casual", "sick", "earned", "adjustment"),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().greater(Joi.ref("startDate")),
    reason: Joi.string().required().not().empty(),
  });

  return schema.validate(data);
}

export function isNotificationFormValid(data) {
  const schema = Joi.object({
    date: Joi.date().required(),
    title: Joi.string().required().not().empty(),
    message: Joi.string().required().not().empty(),
  });

  return schema.validate(data);
}

export function isAnnouncementFormValid(data) {
  const schema = Joi.object({
    date: Joi.date().required(),
    title: Joi.string().required().not().empty(),
    message: Joi.string().required().not().empty(),
  });

  return schema.validate(data);
}
