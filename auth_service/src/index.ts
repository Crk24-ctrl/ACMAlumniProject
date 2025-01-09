import dotenv from "dotenv";
import findenv from "find-config";
dotenv.config({ path: findenv(".env") as string });

import express from "express";
import authRoutes from "./routes";
import configdb from "./config/db";
import { errorMiddleware } from "./middlewares";

(async () => {
  await configdb();
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // necessary for health checks
  app.get("/test", (_req: express.Request, res: express.Response) => {
    res.sendStatus(200);
  });

  // api gateway will place /api/auth as context
  app.use("/", authRoutes);

  app.use(errorMiddleware);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
