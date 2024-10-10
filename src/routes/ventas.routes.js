import { Router } from "express";
import {
  consultarCorteDia,
  consultarTicket,
  consultarVentasPerido,
  consultarVentasProducto,
  eliminarVenta,
  registrarVenta,
} from "../controllers/ventas.controller.js";

const router = Router();

router.get("/:id_ticket", consultarTicket);
router.get("/corte/:fecha_inicio/:fecha_final", consultarCorteDia);
router.get("/:fecha_inicio/:fecha_final", consultarVentasPerido);
router.get("/:fecha_inicio/:fecha_final/:idProducto", consultarVentasProducto);

router.delete("/:id_venta", eliminarVenta);
router.post("/", registrarVenta);

export default router;
