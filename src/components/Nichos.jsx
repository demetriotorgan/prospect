import React, { useEffect, useState } from "react";
import "../styles/Nicho.css";
import NichoFormulario from "./Nicho/NichoFormulario";
import useSalvarNicho from "../hooks/useSalvarNicho";
import useCarregarNichos from "../hooks/useCarregarNichos";

const NichoForm = () => {
  const {salvarNicho, loading, error, success} = useSalvarNicho();
  const {nichoOptions, erroNicho} = useCarregarNichos();

   useEffect(() => {
    console.log(nichoOptions);
  }, [nichoOptions]);

  return (
    <>
    <div className="nicho-wrapper">
  <NichoFormulario 
    onSave={salvarNicho}
    onLoading={loading}
    onError={error}
    onSuccess={success}
  />
  <div className="nichos-cadastrados">
    <h2>Nichos Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {nichoOptions.map((nicho) => (
          <tr key={nicho._id}>
            <td>{nicho.tipo}</td>
            <td>
              <button onClick={() => excluirNicho(nicho._id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </>
  );
};

export default NichoForm;
