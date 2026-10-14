import { createApp } from "./app.js";
import { createDatabase } from "./database.js";

const database = createDatabase();
const app = createApp(database);
const port = Number(process.env.PORT ?? 3001);

const server = app.listen(port, () => {
  console.log(`Portfolio API listening on port ${port}`);
});

function shutDown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
