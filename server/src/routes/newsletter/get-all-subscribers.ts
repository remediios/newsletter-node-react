import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getAllSubscribersHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany();
      return response.status(200).json({ subscribers, message: "OK" });
    } catch (error: unknown) {
      console.log(error);
      throw new Error();
    }
  };
