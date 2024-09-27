import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importacion de routes
import cajaRouter from "./routes/caja.routes.js";
import productoRouter from "./routes/productos.routes.js";
import inventarioRouter from "./routes/inventario.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import ventasRouter from "./routes/ventas.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Puerto de conexion
const port = 3000;

// Router de la api
app.use("/api", cajaRouter);
app.use("/api/producto", productoRouter);
app.use("/api/inventario", inventarioRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/ventas", ventasRouter);

app.get("/", (req, res) => {
  res.send("Hello World! casas");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
