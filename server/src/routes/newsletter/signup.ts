import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email";
import { PrismaClient } from "@prisma/client";
import { upsertSubscriber } from "../../service/actions";
import { ErrorCode } from "../../errors/api-error";

interface SignUpPayload {
  email?: string;
}

export const signUpHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
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
      console.log("signUpHandler: Sign Up Successful");

      return response.status(200).json({ subscriber, message: "OK" });
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
