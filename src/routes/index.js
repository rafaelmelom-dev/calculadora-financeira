import express from "express";
import juros from "./juros.js";
const router = express.Router();

router.get("/", (req, res) => {
  const theme = req.cookies.theme || light;

  res.render("home/index", { title: "Calculadora Financeira", theme });
});

router.use("/juros", juros);

export default router;
