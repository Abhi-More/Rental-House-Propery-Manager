import * as Yup from "yup";

// validation schema for login form
export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

// validations for property form
export const propertySchema = Yup.object().shape({
  propertyType: Yup.string().required("Please select property type"),
  propertyName: Yup.string()
    .trim()
    .required("Property Name is required")
    .min(2, "Propery Name contains at least 2 characters")
    .max(25, "Property Name contains less than 25 characters")
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]*$/,
      "Property Name must contain at least one alphabet"
    ),
  bedrooms: Yup.number().required("Please select number of bedrooms"),
  bathrooms: Yup.number().required("Please select number of bathrooms"),
  furnishingType: Yup.string().required("Please select furnishing type"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .min(6, "Address contains at least 6 characters")
    .max(50, "Address contains less than 50 characters"),
  contact: Yup.number()
    .required("Contact is required")
    .min(1000000000, "Contact must be 10 digits")
    .max(9999999999, "Contact must be 10 digits")
    .typeError("Enter only numbers"),
  rent: Yup.string()
    .required("Rent is required")
    .test(
      "isNumber",
      "Rent must be a number",
      (value) => !isNaN(parseFloat(value))
    )
    .test(
      "notNegative",
      "Rent cannot be negative",
      (value) => parseFloat(value) >= 0
    )
    .test("notZero", "Rent cannot be zero", (value) => parseFloat(value) !== 0)
    .matches(
      /^\d+(\.\d{1,4})?$/,
      "Rent must be a number with up to 4 decimal places"
    )
    .max(20, "Rent is to big"),
  details: Yup.string()
    .trim()
    .required("Details are required")
    .min(6, "Details contain at least 6 characters")
    .max(100, "Details contain less than 100 characters"),
});
