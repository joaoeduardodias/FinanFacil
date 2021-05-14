import express from "express";

const app = express();
app.use(express.json());
console.log("teste");
app.listen(3333, () => console.log("Server is running!"));
