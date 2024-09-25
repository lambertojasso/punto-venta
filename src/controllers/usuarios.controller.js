// Funcion par aun nuevo usuario
export const insertarProducto = (req, res) => {
    res.json({ msj: "Nuevo usuario" });
  };
  
  // eliminar un usuario
  export const eliminarProducto = (req, res) => {
    const { id_usuario } = req.params;
  
    res.json({ msj: `Eliminar usuario especifico: ${id_usuario}` });
  };
  
  
  // Funcion para nuevo producto
  export const actualizarUsuario = (req, res) => {
      res.json({ msj: "actualizar un usuario producto" });
    };