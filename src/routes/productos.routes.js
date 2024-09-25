import { Router } from "express";

import {
  actualizarProducto,
  eliminarProducto,
  insertarProducto,
  productoDesc,
  productoId,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/producto/:id_producto", productoId);
router.get("/producto/desc/:desc_producto", productoDesc);

router.post("/producto", insertarProducto);
router.put("/producto", actualizarProducto);
router.delete("/producto/:id_producto", eliminarProducto);

export default router;
