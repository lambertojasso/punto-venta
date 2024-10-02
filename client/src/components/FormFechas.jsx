import React from "react";
import { useForm } from "react-hook-form";
import { useTienda } from "../context/TiendaContext";

export const FormFechas = () => {


   const {fechas, setFechas} = useTienda();
   
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fechaInicio: fechas.fechaInicio,
      fechaFinal: fechas.fechaFinal,
    },
  });

  const onSubmit = handleSubmit((values) => {
    setFechas({
      fechaInicio: values.fechaInicio,
      fechaFinal: values.fechaFinal,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="mt-1 mb-1">Fecha Inicio</div>
          <input
            type="date"
            className="form-control form-control-lg "
            autoComplete="off"
            placeholder="Descripcion"
            {...register("fechaInicio", { required: true })}
          />
        </div>

        <div className="col-4">
          <label className="mt-1 mb-1">Fecha Final</label>
          <input
            type="date"
            className="form-control form-control-lg"
            autoComplete="off"
            placeholder="Descripcion"
            {...register("fechaFinal", { required: true })}
          />
        </div>

        <div className="col-4 text-center align-self-end">
          <button type="submit" className="btn btn-success">
            Consultar
          </button>
        </div>
      </div>
    </form>
  );
};
