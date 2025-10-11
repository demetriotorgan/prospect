import { useState } from "react";
import api from "../../util/api";

export function useEncerrarAgendamento() {
  const [loadingIds, setLoadingIds] = useState([]);
  

  const encerrarAgendamento = async (reuniao, valores) => {
    const { resultado, texto } = valores[reuniao._id] || {};

    if (!resultado || !texto) {
      alert("Preencha todos os dados de encerramento");
      return;
    }

    const payload = { resultado, texto };

    // Marca este agendamento como carregando
    setLoadingIds((prev) => [...prev, reuniao._id]);

    try {
      const response = await api.put(
        `encerrar-agendamento/${reuniao._id}`,
        payload
      );

      console.log("✅ Agendamento atualizado:", response.data);
      alert("Agendamento encerrado com sucesso!");

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao encerrar agendamento:", error);
      alert("Erro ao encerrar o agendamento. Tente novamente.");
      throw error;
    } finally {
      // Remove o ID do loading ao finalizar
      setLoadingIds((prev) => prev.filter((id) => id !== reuniao._id));
    }
  };

  const isLoading = (id) => loadingIds.includes(id);

  return {
    encerrarAgendamento,
    loadingIds,
    isLoading,
  };
}
