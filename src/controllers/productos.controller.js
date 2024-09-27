import { pool } from "../db.js";

// Funcion buscar producto
export const productoId = async (req, res) => {
  const { id_producto } = req.params;

  try {
    // Lista de inventario
    const [producto] = await pool.query(
      `select p.idproductos, p.codigo, p.descripcion, pr.costo, pr.precioVenta from productos p 
inner join precios pr on pr.idProducto = p.idproductos
where p.idproductos = ?`,
      [id_producto]
    );

    if (producto.length === 0)
      return res.status(404).json({ msj: `No existe producto ${id_producto}` });

    res.json(producto[0]);
  } catch (error) {
    res.status(500), json({ ...error });
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

    if (productos.length === 0)
      return res
        .status(404)
        .json({ msj: `No existe producto ${desc_producto}` });

    res.json(productos);
  } catch (error) {
    res.status(500), json({ ...error });
  }
};

// Funcion para nuevo producto
export const insertarProducto = async (req, res) => {
  const { codigo, descripcion } = req.body;

  try {
    const [nuevoProd] = await pool.query(
      "insert into productos (idProductos, codigo, descripcion) values (0,?,?)",
      [codigo, descripcion]
    );

    /* Retorna si existe un error */
    if (nuevoProd.affectedRows === 0)
      return res.status(404).json({ msj: "Error de registrar producto" });

    res.json({ msj: `Producto nuevo registrado ${descripcion}` });
  } catch (error) {
    res.status(500), json({ ...error });
  }
};

// eliminar un producto
export const eliminarProducto = async (req, res) => {
  const { id_producto } = req.params;

  try {
    // Verifica la existencia en el inventario
    const [cantInventario] = await pool.query(
      `select sum(i.cantidad) as 'total' from inventario i where i.idProducto = ?`,
      [id_producto]
    );

    if (cantInventario[0].total > 0)
      return res
        .status(404)
        .json({ msj: "El producto cuenta con registros en inventario!" });

    // Verifica la existencia en las ventas
    const [cantVenta] = await pool.query(
      `select count(*) as 'total' from ventas v where v.idProducto = ?`,
      [id_producto]
    );

    if (cantVenta[0].total > 0)
      return res
        .status(404)
        .json({ msj: "El producto cuenta con registros en ventas!" });

    // Eliminar del inventario
    const [eliminaInv] = await pool.query(
      "delete from inventario i where i.idProducto = ?",
      [id_producto]
    );

    /* Retorna si existe un error */
    if (eliminaInv.affectedRows === 0)
      return res.status(404).json({ msj: "Error al eliminar del inventario" });

    // Eliminar precio
    const [eliminaPrec] = await pool.query(
      "delete from precios p where p.idProducto = ?",
      [id_producto]
    );

    /* Retorna si existe un error */
    if (eliminaPrec.affectedRows === 0)
      return res.status(404).json({ msj: "Error al eliminar precio" });

    // Elimina del la tabla de productos
    const [eliminaProd] = await pool.query(
      "delete from productos p where p.idproductos = ?",
      [id_producto]
    );

    /* Retorna si existe un error */
    if (eliminaProd.affectedRows === 0)
      return res.status(404).json({ msj: "Error al eliminar producto" });

    res.json({ msj: `Eliminar Producto especifico: ${id_producto}` });
  } catch (error) {
    res.status(500), json({ ...error });
  }
};

// Funcion para nuevo producto
export const actualizarProducto = async (req, res) => {
  const { idproductos, codigo, descripcion } = req.body;

  try {
    const [actualizaProd] = await pool.query(
      "update productos p set p.codigo = ? , p.descripcion = ? where p.idProductos = ? ",
      [codigo, descripcion, idproductos]
    );

    /* Retorna si existe un error */
    if (actualizaProd.affectedRows === 0)
      return res.status(404).json({ msj: "Error al actualizar producto" });

    res.json({ msj: `Producto actualizado ${descripcion}` });
  } catch (error) {
    res.status(500), json({ ...error });
  }
};
