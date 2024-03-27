import express from "express";
import { signUpHandler } from "./signup";
import { PrismaClient } from "@prisma/client";

export const createNewsletterRouter = (prisma: PrismaClient) => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signUpHandler(prisma));

  return newsletterRouter;
};
