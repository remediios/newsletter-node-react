import request from "supertest";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";

describe("signup", () => {
  const prisma = new PrismaClient();
  const server = createServer({ prisma }).listen(80);

  afterAll(async () => {
    server.close();
    //cleanup stage
    await prisma.newsletterSubscriber.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    //cleanup stage
    await prisma.newsletterSubscriber.deleteMany();
  });

  it("should throw 400 if no email is sent", async () => {
    await request(server).post("/api/v1/newsletter/signup").send().expect(400);
  });

  it("should return 400 if the email is not valid", async () => {
    const email = "integration-test@.com";
    await request(server)
      .post("/api/v1/newsletter/signup")
      .send({ email })
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("should return 201 if a valid email is sent", async () => {
    await request(server)
      .post("/api/v1/newsletter/signup")
      .send({ email: "john@wick.com" })
      .expect("Content-Type", /json/)
      .expect(201);
  });
});
