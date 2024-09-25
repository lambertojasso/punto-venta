import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importacion de routes
import cajaRouter from "./routes/caja.routes.js";
import productoRoute from "./routes/productos.routes.js";
import inventarioRoute from "./routes/inventario.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = 3010;

app.use("/api", cajaRouter);
app.use("/api", productoRoute);
app.use("/api", inventarioRoute);

app.get("/", (req, res) => {
  res.send("Hello World! casas");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
