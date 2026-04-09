"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import { newVerification } from "../../../actions/new-verification";
import { CardWrapper } from "../../../app/components/auth/CardWrapper";
import { FormError } from "../../../app/components/auth/FormError";
import { FormSuccess } from "../../../app/components/auth/FormSuccess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const missingTokenError = token ? undefined : "Missing token!";

  useEffect(() => {
    if (!token || success || error) return;

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {!success && !error && !missingTokenError && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error ?? missingTokenError} />}
      </div>
    </CardWrapper>
  );
};
