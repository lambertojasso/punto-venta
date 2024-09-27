// Lista de usuarios

import { pool } from "../db.js";

export const listaUsuarios = async (req, res) => {
  try {
    // Lista de inventario
    const [usariosLista] = await pool.query(
      `select u.idusuarios, u.usuario, u.tipo from usuarios u`
    );

    if (usariosLista.length === 0)
      return res.status(404).json({ msj: "No existen registro!" });

    res.json(usariosLista);
  } catch (error) {
    res.status(500).json({ msj: "Error servidor !!", ...error });
  }
};

// Funcion par aun nuevo usuario
export const insertUsuario = async (req, res) => {
  const { usuario, password, tipo } = req.body;

  console.log(usuario, password, tipo);

  try {
    const [usuarioNuevo] = await pool.query(
      "insert into usuarios (idusuarios, usuario, password, tipo) values (0,?, ?, ?)",
      [usuario, password, tipo]
    );

    /* Retorna si existe un error */
    if (usuarioNuevo.affectedRows === 0)
      return res.status(404).json({ msj: "Error de registrar usuario" });

    res.json({ msj: `Usuario registrado` });
  } catch (error) {
    res.status(500).json({ msj: "Error ingresar usuario", ...error });
  }
};

// eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [eliminarUsua] = await pool.query(
      "delete from usuarios u where u.idusuarios = ?",
      [id_usuario]
    );

    /* Retorna si existe un error */
    if (eliminarUsua.affectedRows === 0)
      return res.status(404).json({ msj: "Error al eliminar usuario" });

    res.json({ msj: `Usuario eliminado` });
  } catch (error) {
    res.status(500).json({ msj: "Error eliminar usuario", ...error });
  }
};

// Funcion para nuevo producto
export const actualizarUsuario = async (req, res) => {
  const { idusuarios, usuario, password, tipo } = req.body;

  console.log(usuario, password, tipo);

  try {
    const [actualizaUsua] = await pool.query(
      "update usuarios u set u.usuario = ?, u.password = ?, u.tipo = ? where u.idusuarios = ?",
      [usuario, password, tipo, idusuarios]
    );

    /* Retorna si existe un error */
    if (actualizaUsua.affectedRows === 0)
      return res.status(404).json({ msj: "Error de actualizacion" });

    res.json({ msj: `Usuario actualizado` });
  } catch (error) {
    res.status(500).json({ msj: "Error actualizar usuario", ...error });
  }
};
