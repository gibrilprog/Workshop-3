import express from "express";
import booksRouter from "./routes/books.routes";

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST ?? "127.0.0.1";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Workshop Express & TypeScript",
    routes: ["/books"]
  });
});

app.use("/books", booksRouter);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
