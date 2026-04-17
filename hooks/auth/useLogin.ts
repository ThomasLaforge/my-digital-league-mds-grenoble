import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { LoginSchema } from "@/schemas";
import { authService } from "@/services/auth/authService";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await authService.login(values);
      if (data?.error) {
        form.reset();
        setError(data.error);
      }
      if (data?.success && !data?.error) {
        form.reset();
        setSuccess(data.success);
        // Attendre un moment avant de rediriger pour que la page se mette à jour
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      }
    });
  };

  return {
    form,
    error: error || urlError,
    success,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
