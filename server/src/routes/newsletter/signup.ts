import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email";
import { PrismaClient } from "@prisma/client";
import { upsertSubscriber } from "../../service/actions";

interface SignUpPayload {
  email?: string;
}

export const signUpHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const { email = "" } = request.body as SignUpPayload;

      if (!email) {
        throw new Error("Email is required");
      }

      if (!isEmailValid(email)) {
        throw new Error("Email is invalid");
      }

      //Create subscriber
      const subscriber = await upsertSubscriber(prisma, email);
      // Publish notification pub/sub topic

      console.log("signUpHandler: Sign Up Successful");

      return response.status(200).json({ subscriber, message: "OK" });
    } catch (error) {
      return new Error();
    }
  };
