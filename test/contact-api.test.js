import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import request from "supertest";
import { createApp } from "../src/server/app.js";
import { createDatabase } from "../src/server/database.js";

const database = createDatabase(":memory:");
const app = createApp(database);

beforeEach(() => {
  database.exec("DELETE FROM contact_messages");
});

after(() => {
  database.close();
});

test("accepts a valid contact message and saves its trimmed content", async () => {
  const response = await request(app).post("/api/contact").send({
    name: "  Shivani Sharma  ",
    email: "shivani@example.com",
    subject: "  Portfolio opportunity  ",
    message: "  Hello there  ",
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.message, "Thanks! Your message has been received.");
  assert.deepEqual(
    database.prepare("SELECT name, email, subject, message FROM contact_messages").get(),
    {
      name: "Shivani Sharma",
      email: "shivani@example.com",
      subject: "Portfolio opportunity",
      message: "Hello there",
    },
  );
});

test("allows same-origin requests when the site and API share a host", async () => {
  const response = await request(app)
    .get("/api/health")
    .set("Host", "portfolio.example")
    .set("Origin", "http://portfolio.example");

  assert.equal(response.status, 200);
  assert.equal(response.headers["access-control-allow-origin"], "http://portfolio.example");
});

test("rejects missing fields and invalid email addresses without saving", async () => {
  const missingField = await request(app).post("/api/contact").send({
    name: "Shivani",
    subject: "Hello",
    message: "A message",
  });
  const invalidEmail = await request(app).post("/api/contact").send({
    name: "Shivani",
    email: "not-an-email",
    subject: "Hello",
    message: "A message",
  });

  assert.equal(missingField.status, 400);
  assert.equal(invalidEmail.status, 400);
  assert.equal(invalidEmail.body.error, "Please enter a valid email address.");
  assert.equal(database.prepare("SELECT count(*) AS count FROM contact_messages").get().count, 0);
});

test("rejects oversized fields without saving", async () => {
  const response = await request(app).post("/api/contact").send({
    name: "S".repeat(101),
    email: "shivani@example.com",
    subject: "Hello",
    message: "A message",
  });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /name must be between/);
  assert.equal(database.prepare("SELECT count(*) AS count FROM contact_messages").get().count, 0);
});
