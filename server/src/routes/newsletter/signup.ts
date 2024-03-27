import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email";

interface SignUpPayload {
  email?: string;
}

export const signUpHandler = async (request: Request, response: Response) => {
  try {
    const { email = "" } = request.body as SignUpPayload;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!isEmailValid(email)) {
      throw new Error("Email is invalid");
    }

    console.log(email);

    return response.status(200).json({ message: "OK" });
  } catch (error) {
    return new Error();
  }
};
