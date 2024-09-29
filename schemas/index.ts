import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
<<<<<<< HEAD
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
=======
    message: "Email jest wymagany",
  }),
  password: z.string().min(1, {
    message: "Hasło jest wymagane",
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
<<<<<<< HEAD
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
=======
    message: "Email jest wymagany",
  }),
  password: z.string().min(6, {
    message: "Hasło powinno mieć minimum 6 znaków",
  }),
  name: z.string().min(1, {
    message: "Imię i nazwisko są wymagane",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email jest wymagany",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Hasło powinno mieć minimum 6 znaków",
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
  }),
});