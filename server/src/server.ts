import express, { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health";
import { createNewsletterRouter } from "./routes/newsletter";

const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let server: Express | null = null;

export const createServer = (): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  //routes
  server.use("/api/v1", createHealthRouter());
  server.use("/api/v1", createNewsletterRouter());

  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  //error handler
  server.use(errorHandler);

  return server;
};
