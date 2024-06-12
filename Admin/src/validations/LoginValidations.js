import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email().required("All fields are required"),
    password: Yup.string().min(8).max(20).required("All fields are required"),
});