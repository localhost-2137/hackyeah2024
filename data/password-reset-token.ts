import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.token.findUnique({
      where: { token, type: "PASSWORD_RESET" },
      select: {
        id: true,
        expires: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.token.findFirst({
      where: {
        type: "PASSWORD_RESET",
        user: {
          email,
        },
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
