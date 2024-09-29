"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="w-3/4 h-2/3 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row-reverse w-full h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 xl:w-1/3 md:w-1/2 w-full flex flex-col sm:p-12 p-4 md:border-l-2 justify-center items-center"
          >
            <h2 className="text-3xl font-bold tracking-wider mb-16 text-center">
              RESETUJ HASŁO
            </h2>
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="email@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Wyślij email resetujący
            </Button>
          </form>
        </Form>
        <div className="md:flex hidden flex-1 items-center justify-center">
          <video
            autoPlay
            muted
            loop
            className="xl:w-[500px] xl:h-[500px] lg:w-[300px] lg:h-[300px]"
          >
            <source src="/logo-animation.mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};
