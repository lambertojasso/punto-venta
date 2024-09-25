import { Router } from "express";
import {
  listaProductos,
  productoEspecifico,
} from "../controllers/caja.controller.js";

const router = Router();

router.get("/caja", listaProductos);
router.get("/caja/:id_producto", productoEspecifico);

export default router;
