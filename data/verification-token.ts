import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.token.findUnique({
      where: { token, type: "VERIFICATION" },
      select: {
        id: true,
        expires: true,
        user: {
          select: {
            email: true,
          },
        },  
      }
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.token.findFirst({
      where: {
        type: "VERIFICATION",
        user: {
          email,
        },
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
