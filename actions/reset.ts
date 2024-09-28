"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
  const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      existingUser.email as string,
      passwordResetToken.token,
    );
  }

  return { success: "If an account with that email exists, we sent you a password reset link!" };
}