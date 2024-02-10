import express, { Application } from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes.ts";
import booksRoutes from "./routes/books.routes.ts";
import genresRoutes from "./routes/genres.routes.ts";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", usersRoutes);
app.use("/api", booksRoutes);
app.use("/api", genresRoutes);

const port: number = 5000;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
