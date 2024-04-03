import { Request, Response } from "express";
import { isPubSubPayload } from "../../src/services/pubsub/gcp";
import { ErrorCode } from "../../src/errors/api-error";

export const sendConfirmEmailHandler =
  () => async (request: Request, response: Response) => {
    try {
      //1. Parse PubSub payload
      const { body } = request;

      //2. Validate
      if (!isPubSubPayload(body)) {
        throw new ErrorCode("ERR-003");
      }

      //3. Parse message payload
      const {
        message: { data: encodedJsonObject },
      } = body;

      const parsedBuffer = Buffer.from(
        encodedJsonObject as string,
        "base64"
      ).toString("ascii");

      const parsedPayload = JSON.parse(parsedBuffer);

      //4. Send email
      console.log("sendConfirmEmailHandler: ", parsedPayload);

      return response.status(200).send({ message: "OK" });
    } catch (error) {
      throw new Error(String(error));
    }
  };
