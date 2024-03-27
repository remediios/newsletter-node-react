import validator from "validator";

export const isEmailValid = (email: string): boolean => {
  return validator.isEmail(email);
};
