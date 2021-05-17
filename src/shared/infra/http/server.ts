import express from "express";

import { userRoutes } from "./routes/users.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.listen(3333, () => console.log("Server is running!"));
