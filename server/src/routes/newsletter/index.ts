import express from "express";
import { signUpHandler } from "./signup";

export const createNewsletterRouter = () => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signUpHandler);

  return newsletterRouter;
};
