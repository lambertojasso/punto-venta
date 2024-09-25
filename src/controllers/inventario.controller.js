import { pool } from "../db.js";

//  Funcion para obtener el inventario
export const consultaInvetario = async (req, res) => {
  try {

    // Lista de inventario
    const [inventario] = await pool.query(
      `select p.codigo, p.descripcion, inv.cantidad  from inventario inv 
inner join productos p on inv.idProducto = p.idproductos`
    );

    if (inventario.length === 0) return res.sendStatus(404);

    res.json(inventario);
  } catch (error) {
    res.sendStatus(500);
  }

  // res.json({ msj: "Inventario de productos" });
};

// Funcion para obtener un producto especifico por id
export const actualizarInventario = (req, res) => {
  const { id_producto, cantidad } = req.params;

  res.json({ msj: `Producto especifico: ${(id_producto, cantidad)}` });
};
