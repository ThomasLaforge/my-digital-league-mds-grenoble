"use client";

import { Controller } from "react-hook-form";
import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/input/Input";
import { useRegister } from "@/hooks/auth/useRegister";
import styles from "./Auth.module.scss";

export const RegisterForm = () => {
  const { form, onSubmit, error, success, isPending } = useRegister();

  return (
    <CardWrapper
      headerLabel="Créer un compte !"
      backButtonLabel="Vous avez déjà un compte ?"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nom"
                placeholder="John Doe"
                disabled={isPending}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                error={!!form.formState.errors.name}
                errorMessage={form.formState.errors.name?.message}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                disabled={isPending}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                error={!!form.formState.errors.email}
                errorMessage={form.formState.errors.email?.message}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                label="Mot de passe"
                type="password"
                placeholder="******"
                disabled={isPending}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                error={!!form.formState.errors.password}
                errorMessage={form.formState.errors.password?.message}
              />
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="primary"
          label={isPending ? "Création du compte..." : "Créer un compte"}
          fullWidth
          disabled={isPending}
        />
      </form>
    </CardWrapper>
  );
};
