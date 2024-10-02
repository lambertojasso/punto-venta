import React from "react";
import { useForm } from "react-hook-form";

export const Search = ({ title = "", setSearch }) => {
    
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((values) => {
    setSearch(values)
    reset();
  });

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control form-control-lg"
          autoComplete="off"
          {...register("search", { required: true })}
        />
      </form>
     
    </>
  );
};