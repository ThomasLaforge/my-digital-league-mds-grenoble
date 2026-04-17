import { getAppUrl } from "./getAppUrl";

const domain = getAppUrl();
const apiKey = process.env.SENDGRID_API_KEY;
const sender = "thomas.laforge.38@gmail.com";

console.log("SendGrid API Key present:", !!apiKey);
console.log("Domain:", domain);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  console.log("Sending verification email to:", email);
  console.log("Confirmation link:", confirmLink);

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
          },
        ],
        from: { email: sender },
        subject: "Confirmez votre adresse e-mail",
        content: [
          {
            type: "text/html",
            value: `<p>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre adresse e-mail.</p>`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("SendGrid error:", error);
      throw new Error(`SendGrid error: ${JSON.stringify(error)}`);
    }

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  console.log("Sending password reset email to:", email);
  console.log("Reset link:", resetLink);

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
          },
        ],
        from: { email: sender },
        subject: "Réinitialisation de votre mot de passe",
        content: [
          {
            type: "text/html",
            value: `<p>Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.</p>`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("SendGrid error:", error);
      throw new Error(`SendGrid error: ${JSON.stringify(error)}`);
    }

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation:",
      error
    );
    throw error;
  }
};
