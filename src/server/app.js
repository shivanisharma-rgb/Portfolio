import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldLimits = { name: 100, email: 254, subject: 150, message: 5000 };
const appDirectory = path.dirname(fileURLToPath(import.meta.url));

function validateContact(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Please provide your contact details and message." };
  }

  const fields = {};
  for (const [field, maxLength] of Object.entries(fieldLimits)) {
    const value = body[field];
    if (typeof value !== "string") {
      return { error: `Please provide a valid ${field}.` };
    }

    fields[field] = value.trim();
    if (!fields[field] || fields[field].length > maxLength) {
      return { error: `The ${field} must be between 1 and ${maxLength} characters.` };
    }
  }

  if (!emailPattern.test(fields.email)) {
    return { error: "Please enter a valid email address." };
  }

  return { fields };
}

export function createApp(database, { allowedOrigins = process.env.CORS_ORIGINS ?? "http://localhost:5173" } = {}) {
  const app = express();
  const origins = new Set(allowedOrigins.split(",").map((origin) => origin.trim()).filter(Boolean));

  app.disable("x-powered-by");
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "style-src": ["'self'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
        "connect-src": ["'self'", ...origins],
      },
    },
  }));
  app.use(cors((request, callback) => {
    const origin = request.get("Origin");
    const sameOrigin = origin === `${request.protocol}://${request.get("host")}`;
    if (!origin || sameOrigin || origins.has(origin)) {
      callback(null, { origin: true, methods: ["GET", "POST"] });
      return;
    }
    callback(new Error("This origin is not allowed to access the portfolio API."));
  }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.post("/api/contact", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }), (request, response, next) => {
    const result = validateContact(request.body);
    if (result.error) {
      response.status(400).json({ error: result.error });
      return;
    }

    try {
      const insertMessage = database.prepare(`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (@name, @email, @subject, @message)
      `);
      insertMessage.run(result.fields);
      response.status(201).json({ message: "Thanks! Your message has been received." });
    } catch (error) {
      next(error);
    }
  });

  if (process.env.NODE_ENV === "production") {
    const distributionPath = path.resolve(appDirectory, "../../dist");
    app.use(express.static(distributionPath));
    app.get(/.*/, (_request, response) => {
      response.sendFile(path.join(distributionPath, "index.html"));
    });
  } else {
    app.use("/api", (_request, response) => {
      response.status(404).json({ error: "API endpoint not found." });
    });
  }

  app.use((error, _request, response, _next) => {
    if (response.headersSent) return;

    const status = error.status ?? error.statusCode;
    if (status === 400) {
      response.status(400).json({ error: "Please send a valid JSON request." });
      return;
    }
    if (status === 413) {
      response.status(413).json({ error: "Your message is too large. Please shorten it and try again." });
      return;
    }

    console.error("Portfolio API request failed:", error);
    response.status(500).json({ error: "Something went wrong while saving your message. Please try again." });
  });

  return app;
}
