"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
<<<<<<< HEAD
import { CardWrapper } from "@/components/auth/card-wrapper";
=======
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
<<<<<<< HEAD
      setError("Missing token!");
=======
      setError("Brak tokenu!");
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
<<<<<<< HEAD
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
      onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
=======
        setError("Coś poszło nie tak! Spróbuj ponownie");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-1/4 h-2/3 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex items-center w-full h-full justify-center">
        {!success && !error && <Loader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold opacity-50 tracking-wider mb-16">Weryfikowanie</h2>
      <BeatLoader />
    </div>
  );
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
}