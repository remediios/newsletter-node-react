import express, { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health";
import { createNewsletterRouter } from "./routes/newsletter";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PubSubService } from "./services/pubsub/types";

interface IServerParams {
  prisma: PrismaClient;
  pubSub: PubSubService;
}

const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let server: Express | null = null;

export const createServer = ({ prisma, pubSub }: IServerParams): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  //routes
  server.use("/api/v1", createHealthRouter());
  server.use("/api/v1", createNewsletterRouter(prisma, pubSub));

  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  //error handler
  server.use(errorHandler);

  return server;
};
