import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'adresse e-mail est obligatoire",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est obligatoire",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "L'adresse e-mail est obligatoire",
  }),
  password: z.string().min(6, {
    message: "6 caractères minimum sont requis",
  }),
  name: z.string().min(1, {
    message: "Le nom est obligatoire",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "L'adresse e-mail est obligatoire",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "6 caractères minimum sont requis",
  }),
});

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Le nom est obligatoire",
    })
    .max(120, {
      message: "Le nom est trop long",
    })
    .optional(),
});
