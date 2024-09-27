import { pool } from "../db.js";

//  Funcion para obtener el inventario
export const consultaInvetario = async (req, res) => {
  try {
    // Lista de inventario
    const [inventario] = await pool.query(
      `select p.codigo, p.descripcion, inv.cantidad  from inventario inv 
inner join productos p on inv.idProducto = p.idproductos`
    );

    if (inventario.length === 0)
      return res.status(404).json({ msj: "No existen registros!" });

    res.json(inventario);
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

//  Funcion para obtener el inventario de un producto
export const consultaInvetarioProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;

    // Lista de inventario
    const [inventario] = await pool.query(
      `select p.codigo, p.descripcion, i.cantidad from productos p 
inner join inventario i on p.idproductos = i.idProducto
where p.idproductos = ?`,
      [id_producto]
    );

    if (inventario.length === 0)
      return res.sendStatus(404).json({ msj: "No existen registro!" });

    res.json(inventario[0]);
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

// Funcion para obtener un producto especifico por id
export const actualizarInventario = async (req, res) => {
  const { id_producto, cantidad } = req.body;

  try {
    const [update] = await pool.query(
      "update inventario i set i.cantidad = ? where i.idProducto = ?",
      [cantidad, id_producto]
    );

    /* Retorna si existe un error */
    if (update.affectedRows === 0)
      return res.status(404).json({ msj: "Error de actualizacion" });

    res.json({ msj: `Inventario actualizado` });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

// Actualiza inventario compre, venta
export const movimientosInventario = async (lista = []) => {

  try {
    let q1 = "UPDATE inventario SET cantidad = CASE idProducto ",
      q2 = " END WHERE idProducto IN (";

    lista.forEach((el) => {
      q1 += `WHEN ${el.id} THEN cantidad + ${el.cantidad} `;
      q2 += `${el.id},`;
    });

    // elimina la ultima coma
    q2 = q2.substring(0, q2.length - 1);

    q1 = q1 + q2 + ")";

    const [actualizaInve] = await pool.query(q1);

    /* Retorna si existe un error */
    if (actualizaInve.affectedRows != lista.length) return false;

    return true;
  } catch (error) {
    console.log(error);
  }
};
