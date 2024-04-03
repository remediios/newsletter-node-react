import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { isEmailValid } from "../utils/email";
import { ErrorCode } from "../errors/api-error";
import { upsertSubscriber } from "../services/actions";
import { PubSubService } from "../services/pubsub/types";

interface SignUpPayload {
  email?: string;
}

export const signUpHandler =
  (prisma: PrismaClient, pubSub: PubSubService) =>
  async (request: Request, response: Response) => {
    try {
      const { email = "" } = request.body as SignUpPayload;

      if (!email) {
        throw new ErrorCode("ERR-001", "Email");
      }

      if (!isEmailValid(email)) {
        throw new ErrorCode("ERR-002", "Email");
      }

      //Create subscriber
      const subscriber = await upsertSubscriber(prisma, email);
      // Publish notification pub/sub topic
      await pubSub.publish("newsletter-signup", { data: "Hello world" });
      console.log("signUpHandler: Sign Up Successful");

      return response
        .status(201)
        .json({ subscriber, message: "Subscriber created successfully" });
    } catch (error: unknown) {
      if (!(error instanceof ErrorCode)) {
        console.log("signUpHandler: ", error);
        throw new Error(String(error));
      }

      if (["ERR-001", "ERR-002", "ERR-003"].includes(error.code)) {
        return response.status(400).json(error.message);
      }

      return response.status(500).json(error.message);
    }
  };

export const getAllSubscribersHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany();
      return response
        .status(200)
        .json({ subscribers, message: "All Subscribers List" });
    } catch (error: unknown) {
      if (!(error instanceof ErrorCode)) {
        console.log("getAllSubscribersHandler: ", error);
        throw new Error(String(error));
      }

      if (["ERR-001", "ERR-002", "ERR-003"].includes(error.code)) {
        return response.status(400).json(error.message);
      }

      return response.status(500).json(error.message);
    }
  };

export const getSubscriberHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { id },
      });

      if (!subscriber) {
        return new ErrorCode("ERR-004", "Subscriber");
      }

      return response
        .status(200)
        .json({ subscriber, message: "Subscriber found succesfully" });
    } catch (error: unknown) {
      if (!(error instanceof ErrorCode)) {
        console.log("getSubscriberHandler: ", error);
        return response.status(400).json({ message: "Subscriber not found" });
      }

      if (["ERR-001", "ERR-002", "ERR-003", "ERR-004"].includes(error.code)) {
        return response.status(400).json(error.message);
      }

      return response.status(500).json(error.message);
    }
  };

export const deleteSubscriberHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const subscriber = await prisma.newsletterSubscriber.delete({
        where: { id },
      });

      if (!subscriber) {
        return new ErrorCode("ERR-004", "Subscriber");
      }

      return response
        .status(200)
        .json({ subscriber, message: "Subscriber deleted succesfully" });
    } catch (error: unknown) {
      if (!(error instanceof ErrorCode)) {
        console.log("deleteSubscriberHandler: ", error);
        return response
          .status(400)
          .json({ message: "Error deleting subscriber or not found" });
      }

      if (["ERR-001", "ERR-002", "ERR-003", "ERR-004"].includes(error.code)) {
        return response.status(400).json(error.message);
      }

      return response.status(500).json(error.message);
    }
  };
