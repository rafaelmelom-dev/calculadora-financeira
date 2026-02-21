import express from "express";
import juros from "./juros.js";
import investimento from "./investimento.js";
const router = express.Router();

router.get("/", (req, res) => {
  const theme = req.cookies.theme || 'light';

  res.render("home/index", { title: "Calculadora Financeira", theme });
});

router.use("/juros", juros);
router.use("/investimento", investimento);

export default router;
