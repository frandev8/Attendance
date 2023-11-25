import joi from "joi";

import passwordComplexity from "joi-password-complexity";

function validateLogin(data) {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required().label("username"),
    password: passwordComplexity(undefined, "password").required(),
    role: joi.string().required().label("role"),
  });

  return schema.validate(data);
}

function validateSignup(data) {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required().label("username"),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("email"),
    password: passwordComplexity(undefined, "password").required(),
    confirmPass: passwordComplexity(undefined, "confirmPass").required(),
    role: joi.string().required().label("role"),
  });

  return schema.validate(data);
}

export { validateLogin, validateSignup };
