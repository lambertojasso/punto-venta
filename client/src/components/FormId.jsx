import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export const FormId = ({ setCantidad, title = "", text = "", text2 = "" }) => {
  
  const { register, handleSubmit, reset } = useForm({
    values: {numero: null},
  });

  const onSubmit = handleSubmit((values) => {
    const numero = parseInt(values.numero);
    setCantidad(numero);
    reset();
  });


  return (
    <>
      <h2>{title}</h2>
      <h3>{text}</h3>
      <p>{text2}</p>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          className="form-control form-control-lg"
          autoComplete="off"
          {...register("numero", { required: true })}
        />
      </form>
    </>
  );
};
