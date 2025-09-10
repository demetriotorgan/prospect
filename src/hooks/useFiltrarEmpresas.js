import { useState } from "react";

const useFiltrarEmpresas = (empresas) =>{
    const [empresasFiltradas, setEmpresasFiltradas] = useState([]);

    const handleNichoSelecionado = (e)=>{
        const nichoSelecionado = e.target.value
        if (nichoSelecionado === "--Selecione um Nicho--") {
      setEmpresasFiltradas([]);
    } else {
      const filtradas = empresas.filter(
        (empresa) => empresa.tipo?.toLowerCase() === nichoSelecionado.toLowerCase()
      );
      setEmpresasFiltradas(filtradas);
    }
}
    return {empresasFiltradas, handleNichoSelecionado}
};

export default useFiltrarEmpresas;