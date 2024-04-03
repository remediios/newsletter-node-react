import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  signUpHandler,
  getAllSubscribersHandler,
  getSubscriberHandler,
  deleteSubscriberHandler,
} from "../../controllers/newsletter-controller";
import { PubSubService } from "../../services/pubsub/types";

export const createNewsletterRouter = (
  prisma: PrismaClient,
  pubSub: PubSubService
) => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signUpHandler(prisma, pubSub));
  newsletterRouter.get(
    "/newsletter/subscribers",
    getAllSubscribersHandler(prisma)
  );
  newsletterRouter.get(
    "/newsletter/subscriber/:id",
    getSubscriberHandler(prisma)
  );
  newsletterRouter.delete(
    "/newsletter/subscriber/:id",
    deleteSubscriberHandler(prisma)
  );

  return newsletterRouter;
};
