import { Router } from "express";
import {
  actualizarInventario,
  consultaInvetario,
  consultaInvetarioProducto,
} from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", consultaInvetario);
router.get("/:id_producto", consultaInvetarioProducto);

router.put("/", actualizarInventario);

export default router;
