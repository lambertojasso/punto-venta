import { Router } from "express";
import {
  actualizarUsuario,
  consultarUsuario,
  eliminarUsuario,
  insertUsuario,
  listaUsuarios,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", listaUsuarios);
router.get("/:id_usuario", consultarUsuario);

router.post("/", insertUsuario);
router.delete("/:id_usuario", eliminarUsuario);
router.put("/", actualizarUsuario);

export default router;
