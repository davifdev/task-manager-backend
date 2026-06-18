import express from "express";

import { userRouter } from "./routes/users";
import { tasksRouter } from "./routes/tasks";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", tasksRouter);

export { app };
