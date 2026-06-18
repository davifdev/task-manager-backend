import express from "express";

import { userRouter } from "./routes/user-route";
import { tasksRouter } from "./routes/tasks-route";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", tasksRouter);

export { app };
