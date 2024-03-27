import { PrismaClient } from "@prisma/client";
import { createRandomToken } from "../utils/random";

export const upsertSubscriber = async (prisma: PrismaClient, email: string) => {
  try {
    const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
      where: {
        email,
      },
      create: {
        email,
        active: false,
        confirmed: false,
        token: createRandomToken(),
      },
      update: {
        active: false,
        confirmed: false,
        token: createRandomToken(),
      },
    });

    return newsletterSubscriber;
  } catch (error) {
    throw new Error();
  }
};
