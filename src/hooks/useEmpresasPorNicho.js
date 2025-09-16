import { useEffect, useState } from "react"
import useCarregarEmpresas from "./useCarregarEmpresas";

const useEmpresasPorNicho = ({nichoOptions})=>{
    const [empresasPorNicho, setEmpresasPorNicho]=useState({});
    const {empresas, carregando, erro} = useCarregarEmpresas();

    useEffect(()=>{
        if (nichoOptions && empresas) {
      const empresasPorTipo = nichoOptions.reduce((acc, nicho) => {
        acc[nicho.tipo] = empresas.filter(empresa => empresa.tipo === nicho.tipo);
        return acc;
      }, {});
      setEmpresasPorNicho(empresasPorTipo);
    }


    },[nichoOptions, empresas]);
    return {empresasPorNicho}
};

export default useEmpresasPorNicho;