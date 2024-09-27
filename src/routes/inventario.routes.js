import { Router } from "express";
import {
  actualizarInventario,
  consultaInvetario,
  consultaInvetarioProducto,
} from "../controllers/inventario.controller.js";

const router = Router();

router.get("/inventario", consultaInvetario);
router.get("/inventario/:id_producto", consultaInvetarioProducto);

router.put("/inventario", actualizarInventario);

export default router;
