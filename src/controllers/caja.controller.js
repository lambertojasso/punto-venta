//  Funcion para obtener todos los productos
export const listaProductos = async (req, res) => {




  res.json({ msj: "lista de productos" });
};

// Funcion para obtener un producto especifico por id
export const productoEspecifico = (req, res) => {
  const { id_producto } = req.params;

  res.json({ msj: `Producto especifico: ${id_producto}` });
};


