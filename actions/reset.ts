"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Adresse mail non valide." };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Adresse mail non trouvée!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  try {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } catch {
    return {
      error:
        "Une erreur est survenue lors de l'envoi du mail. Veuillez réessayer.",
    };
  }

  return { success: "Réinitialisation de mot de passe envoyé!" };
};
