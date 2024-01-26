import joi from "joi";

import passwordComplexity from "joi-password-complexity";

const passwordComplexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbols: undefined,
  requirementCount: 2,
};

function validateLogin(data) {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required().label("username"),
    password: passwordComplexity(
      passwordComplexityOptions,
      "password"
    ).required(),
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
    password: passwordComplexity(
      passwordComplexityOptions,
      "password"
    ).required(),
    confirmPass: passwordComplexity(
      passwordComplexityOptions,
      "confirmPass"
    ).required(),
    role: joi.string().required().label("role"),
  });

  return schema.validate(data);
}

export { validateLogin, validateSignup };
