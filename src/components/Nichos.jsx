import React, { useState } from "react";
import NichoFormulario from "./Nicho/NichoFormulario";
import api from '../util/api'
import useSalvarNicho from "../hooks/useSalvarNicho";

const NichoForm = () => {
  const {salvarNicho, loading, error, success} = useSalvarNicho();
  

  return (
    <>
    <NichoFormulario 
    onSave={salvarNicho}
    onLoading={loading}
    onError={error}
    onSuccess={success}
    />
    </>
  );
};

export default NichoForm;
