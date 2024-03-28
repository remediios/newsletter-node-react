import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  signUpHandler,
  getAllSubscribersHandler,
  getSubscriberHandler,
} from "../../controllers/newsletter-controller";

export const createNewsletterRouter = (prisma: PrismaClient) => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signUpHandler(prisma));
  newsletterRouter.get(
    "/newsletter/subscribers",
    getAllSubscribersHandler(prisma)
  );
  newsletterRouter.get(
    "/newsletter/subscriber/:id",
    getSubscriberHandler(prisma)
  );

  return newsletterRouter;
};
