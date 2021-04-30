import * as yup from "yup";

const yupValidation = () => {
  return yup.object().shape({
    email: yup.string().required().email("Please enter email address"),
    password: yup
      .string()
      .required()
      .min(8, "Minimum length must be 8 characters"),
  });
};
export default yupValidation;
