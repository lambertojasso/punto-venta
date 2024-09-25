import { pool } from "../db.js";

// Funcion buscar producto
export const productoId = async (req, res) => {
  const { id_producto } = req.params;

  try {
    // Lista de inventario
    const [producto] = await pool.query(
      `select * from productos p where p.idproductos = ?`,
      [id_producto]
    );

    if (producto.length === 0) return res.sendStatus(404);

    res.json(producto[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Funcion para nuevo producto
export const productoDesc = async (req, res) => {
  const { desc_producto } = req.params;

  try {
    // Lista de inventario
    const [productos] = await pool.query(
      `select * from productos p where p.descripcion like "%"?"%"`,
      [desc_producto]
    );

    if (productos.length === 0) return res.sendStatus(404);

    res.json(productos);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Funcion para nuevo producto
export const insertarProducto = async (req, res) => {
  // const { idproductos, codigo, descripcion } = req.body;
  // idproductos	int
  // codigo	varchar(45)
  // descripcion	varchar(200)
  res.json({
    msj: "Nuevo producto",
  });
};

// eliminar un producto
export const eliminarProducto = async (req, res) => {
  const { id_producto } = req.params;

  try {
    // Verifica la existencia en el inventario
    const [cantInventario] = await pool.query(
      `select i.cantidad from inventario i where i.idProducto = ?`,
      [id_producto]
    );

    if (cantInventario.length > 0)
      if (cantInventario[0].cantidad > 0)
        return res
          .status(404)
          .json({ msj: "El producto cuenta con registros en inventario!" });


    // Verifica la existencia en las ventas
    const [cantVenta] = await pool.query(
      `select i.cantidad from inventario i where i.idProducto = ?`,
      [id_producto]
    );

    if (cantVenta.length > 0)
        return res
          .status(404)
          .json({ msj: "El producto cuenta con registros en ventas!" });

        


    res.json({ msj: `Eliminar Producto especifico: ${id_producto}` });
  } catch (error) {
    res.sendStatus(500);
  }
};

// Funcion para nuevo producto
export const actualizarProducto = (req, res) => {
  const { idproductos, codigo, descripcion } = req.body;
  // idproductos	int
  // codigo	varchar(45)
  // descripcion	varchar(200)

  res.json({
    msj: "Actualiza producto",
    nuevo: { idproductos, codigo, descripcion },
  });
};
