"use client";

import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import { useNewPassword } from "@/hooks/auth/useNewPassword";
import styles from "./Auth.module.scss";

export const NewPasswordForm = () => {
  const { form, error, success, isPending, onSubmit } = useNewPassword();

  return (
    <CardWrapper
      headerLabel="Entrez un nouveau mot de passe"
      backButtonLabel="Connexion"
      backButtonHref="/auth/login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            {...form.register("password")}
            id="password"
            disabled={isPending}
            placeholder="******"
            type="password"
          />
          {form.formState.errors.password && (
            <span className={styles.error}>
              {form.formState.errors.password.message}
            </span>
          )}
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <button type="submit" disabled={isPending}>
          {isPending
            ? "Réinitialisation du mot de passe..."
            : "Réinitialisation du mot de passe"}
        </button>
      </form>
    </CardWrapper>
  );
};
