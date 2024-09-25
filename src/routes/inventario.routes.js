import { Router } from "express";
import {
  actualizarInventario,
  consultaInvetario,
} from "../controllers/inventario.controller.js";

const router = Router();

router.get("/inventario", consultaInvetario);
router.get("/inventario/:id_producto/:catidad", actualizarInventario);

export default router;
