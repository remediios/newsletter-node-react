import request from "supertest";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";

describe("health", () => {
  const prisma = new PrismaClient();
  const server = createServer({ prisma }).listen(80);

  afterAll(async () => {
    server.close();
  });

  it("should return 200 if the server is up", async () => {
    await request(server)
      .get("/api/v1/health")
      .send()
      .expect("200 Status")
      .expect(200);
  });
});
