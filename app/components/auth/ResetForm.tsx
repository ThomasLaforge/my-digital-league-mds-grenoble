"use client";

import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import { useReset } from "@/hooks/auth/useForgotPassword";
import styles from "./Auth.module.scss";

export const ResetForm = () => {
  const { form, error, success, isPending, onSubmit } = useReset();

  return (
    <CardWrapper
      headerLabel="Mot de passe oublié?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            {...form.register("email")}
            id="email"
            disabled={isPending}
            placeholder="john.doe@example.com"
            type="email"
          />
          {form.formState.errors.email && (
            <span className={styles.error}>
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <button type="submit" disabled={isPending}>
          {isPending
            ? "Envoi de l'email..."
            : "Envoi du lien de réinitialisation"}
        </button>
      </form>
    </CardWrapper>
  );
};
