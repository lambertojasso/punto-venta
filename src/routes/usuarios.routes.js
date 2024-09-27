import { Router } from "express";
import {
  actualizarUsuario,
  eliminarUsuario,
  insertUsuario,
  listaUsuarios,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", listaUsuarios);
router.post("/usuarios", insertUsuario);
router.delete("/usuarios/:id_usuario", eliminarUsuario);
router.put("/usuarios", actualizarUsuario);

export default router;
