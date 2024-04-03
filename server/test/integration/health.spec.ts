import request from "supertest";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";
import { TestPubSub } from "../../src/services/pubsub/test-pubsub";

describe("health", () => {
  const prisma = new PrismaClient();
  const pubSub = new TestPubSub();
  const server = createServer({ prisma, pubSub }).listen(80);

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
