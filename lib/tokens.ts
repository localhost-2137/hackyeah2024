import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.token.create({
    data: {
      user: {
        connect: {
          email,
        },
      },
      type: "VERIFICATION",
      token,
      expires,
    },
  });

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.token.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await db.token.create({
    data: {
      user: {
        connect: {
          email
        }
      },
      type: "PASSWORD_RESET",
      token,
      expires
    }
  });

  return passwordResetToken;
}