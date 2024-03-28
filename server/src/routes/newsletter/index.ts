import express from "express";
import { PrismaClient } from "@prisma/client";

import { signUpHandler } from "./signup";
import { getAllSubscribersHandler } from "./get-all-subscribers";

export const createNewsletterRouter = (prisma: PrismaClient) => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signUpHandler(prisma));
  newsletterRouter.get(
    "/newsletter/subscribers",
    getAllSubscribersHandler(prisma)
  );

  return newsletterRouter;
};
