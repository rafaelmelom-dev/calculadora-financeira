import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
const app = express();

const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "src", "views"));

app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import routes from "./src/routes/index.js";

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Página não encontrada!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
