import { Router } from "express";
import {
  consultarTicket,
  consultarVentasPerido,
  eliminarVenta,
} from "../controllers/ventas.controller";

const router = Router();

router.get("/ventas/:fecha_inicio/:fecha_final", consultarVentasPerido);
router.get("/ventas/:id_ticket", consultarTicket);

router.delete('/ventas/:id_venta', eliminarVenta);

export default router;
