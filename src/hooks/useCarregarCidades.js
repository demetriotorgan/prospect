import { useEffect, useState } from "react";
import useCarregarEmpresas from "./useCarregarEmpresas";

const useCarregarCidades = ({empresas})=>{
    const [listaCidades, setListaCidades] = useState([]);    
    

    useEffect(()=>{
        if (empresas && empresas.length > 0) {
      const cidadesValidas = empresas
        .map(emp => emp.cidade?.trim())
        .filter(cidade => cidade && cidade.length > 0);

      const cidadesUnicas = [...new Set(cidadesValidas.map(c => c.toLowerCase()))];

      const cidadesFormatadas = cidadesUnicas.map(
        cidade => cidade.charAt(0).toUpperCase() + cidade.slice(1)
      );

      setListaCidades(cidadesFormatadas);
    }
    },[empresas]);

    return {listaCidades}
};

export default useCarregarCidades;