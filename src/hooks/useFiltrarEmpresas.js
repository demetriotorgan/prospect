import { useState, useEffect } from "react";

const useFiltrarEmpresas = (empresas) => {
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [nichoSelecionado, setNichoSelecionado] = useState("");

  const handleNichoSelecionado = (e) => {
    const nicho = e.target.value;
    setNichoSelecionado(nicho);
  };

  useEffect(() => {
    if (!nichoSelecionado || nichoSelecionado === "--Selecione um Nicho--") {
      setEmpresasFiltradas([]);
    } else {
      const filtradas = empresas.filter(
        (empresa) => empresa.tipo?.toLowerCase() === nichoSelecionado.toLowerCase()
      );
      setEmpresasFiltradas(filtradas);
    }
  }, [empresas, nichoSelecionado]); // 🔥 reagir também quando "empresas" mudar

  return { empresasFiltradas, handleNichoSelecionado };
};

export default useFiltrarEmpresas;
