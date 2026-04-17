import { Resend } from "resend";
import { getAppUrl } from "./getAppUrl";

const domain = getAppUrl();

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = "noreply@mydigitalleague.dev";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: sender,
      to: email,
      subject: "Confirmez votre adresse e-mail",
      html: `<p>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre adresse e-mail.</p>`,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  try {
    await resend.emails.send({
      from: sender,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `<p>Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.</p>`,
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation:",
      error
    );
    throw error;
  }
};
