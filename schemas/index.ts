import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email jest wymagany",
  }),
  password: z.string().min(1, {
    message: "Hasło jest wymagane",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
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
  }),
});