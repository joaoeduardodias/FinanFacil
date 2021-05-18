import express from "express";

import { userRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3333, () => console.log("Server is Running!"));
