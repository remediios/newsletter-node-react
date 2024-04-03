import request from "supertest";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";
import { TestPubSub } from "../../src/services/pubsub/test-pubsub";

describe("signup", () => {
  const prisma = new PrismaClient();
  const pubSub = new TestPubSub();
  const server = createServer({ prisma, pubSub }).listen(80);

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

  it("should not fail if the email is already signed up, it should upsert", async () => {
    const email = "integration-test@gmail.com";
    await request(server)
      .post("/api/v1/newsletter/signup")
      .send({ email })
      .expect("Content-Type", /json/)
      .expect(201);

    const firstRecord = await prisma.newsletterSubscriber.findFirst({
      where: { email },
    });

    await request(server)
      .post("/api/v1/newsletter/signup")
      .send({ email })
      .expect("Content-Type", /json/)
      .expect(201);

    const secondRecord = await prisma.newsletterSubscriber.findFirst({
      where: { email },
    });

    const hasNewToken = firstRecord?.token !== secondRecord?.token;
    expect(hasNewToken).toBeTruthy();
  });
});
