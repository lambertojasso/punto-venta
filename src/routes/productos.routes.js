import { Router } from "express";

import {
  actualizarProducto,
  eliminarProducto,
  insertarProducto,
  productoDesc,
  productoId,
} from "../controllers/productos.controller.js";

const router = Router();

//    /productos

router.get("/:id_producto", productoId);
router.get("/desc/:desc_producto", productoDesc);

router.post("/", insertarProducto);
router.put("/", actualizarProducto);
router.delete("/:id_producto", eliminarProducto);

export default router;
