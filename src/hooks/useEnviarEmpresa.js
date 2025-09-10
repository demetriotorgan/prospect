import { useState } from "react";
import api from "../util/api";
import {processarResultados} from '../util/resultados'

const useEnviarEmpresa = ()=>{
    const [salvando, setSalvando] = useState(false);

    const enviarEmpresas = async(tipo, empresas, nichoSelecionado, setNichos)=>{
        setSalvando(true);

        const nichoGeral = nichoSelecionado[tipo];
        if (!nichoGeral) {
        alert("Selecione um nicho antes de enviar");
        setSalvando(false);
        return;
        }
        // Prepara as empresas para envio
    const empresasPreparadas = empresas.map((emp) => ({
      ...emp,
      tipo: nichoGeral,
      statusAtual: emp.statusAtual || "nao-prospectado",
    }));

        try {
            const response = await api.post("/salvar-lista-empresas", empresasPreparadas);
            const {resultados} = response.data

            // Separa empresas já cadastradas
      const {jaCadastradas, cadastradasComSucesso} = processarResultados(resultados);

        // Exibe resultados
      if (jaCadastradas.length > 0) {
        alert(`Empresas já cadastradas: \n${jaCadastradas.join("\n")}`);
      }

      if (cadastradasComSucesso.length > 0) {
        alert(`Empresas cadastradas com sucesso: \n${cadastradasComSucesso.join("\n")}`);
      }

      // Remove o card enviado do estado de nichos
      setNichos((prev) => {
        const novo = { ...prev };
        delete novo[tipo];
        return novo;
      });
        } catch (error) {
            alert("Erro ao enviar dados");
        }finally{
            setSalvando(false);
        }
    };
    return { salvando, enviarEmpresas };
};

export default useEnviarEmpresa;