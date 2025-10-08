import { useState } from 'react';
import api from '../../util/api';
import { montarPayload } from '../../util/prospecUtils';
import axios from 'axios';


const useSalvarAgendamento = () => {
  const [salvando, setSalvando] = useState(false);

  const salvarAgendamento = async (dados) => {
    try {
      setSalvando(true);

      // 🧱 Monta o payload completo
      const payload = montarPayload(dados);
      console.log('PayLoad do hook:', payload);

      // ⚠️ Se retornoAgendado for null, não envia para o backend
      if (!payload.retornoAgendado) {
        console.log("ℹ️ Nenhum retorno agendado — agendamento não será salvo.");        
        return { success: false, msg: "Sem retorno agendado" };
      }

      // 🚀 Envia o payload ao backend
      const response = await api.post('/salvar-agendamento', payload);
      console.log("✅ Agendamento salvo:", response.data);
      alert("✅ Agendamento salvo com sucesso!");
      return response.data;

    } catch (error) {
      console.error("❌ Erro ao salvar agendamento:", error);

      if (error.response?.status === 409) {
        const msg = error.response.data?.msg || "Esta empresa já possui um agendamento.";
        alert(`⚠️ ${msg}`);
        return { success: false, conflict: true, msg };
      }

      alert("❌ Ocorreu um erro ao salvar o agendamento. Tente novamente mais tarde.");
      return { success: false, msg: error.message };
    } finally {
      setSalvando(false);
    }
  };

  return { salvarAgendamento, salvando };
};

export default useSalvarAgendamento;
