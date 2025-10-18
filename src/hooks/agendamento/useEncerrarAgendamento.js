import { useState } from "react";
import api from "../../util/api";

export function useEncerrarAgendamento() {
  const [loadingIds, setLoadingIds] = useState([]);

  const encerrarAgendamento = async (reuniao, valores) => {    
    const valoresAtuais = valores[reuniao._id] || {};
    const { resultado, texto, dataRetorno, horaRetorno, onRetorno } = valoresAtuais;
    const empresaId = reuniao.empresaId;

    // Validação básica (mantendo compatibilidade)
    if (!resultado || !texto) {
      alert("Preencha todos os dados de encerramento");
      return;
    }

    // Detecta se é remarcação ANTES de limpar resultado
    const deveRemarcar = onRetorno === true || resultado === "remarcar";

    let payload = { resultado, texto, empresaId };    

    if (deveRemarcar) {
      if (!dataRetorno || !horaRetorno) {
        alert("Para remarcar, informe data e hora de retorno");
        return;
      }

      // Gera o ISO
      const isoDatetime = new Date(`${dataRetorno}T${horaRetorno}`).toISOString();

      payload = {
        ...payload,
        retornoAgendado: isoDatetime,
        dataTime: isoDatetime,
        indicador: "ligou-agendou-reuniao",
        resultado: "" // conforme solicitado
      };
    }

    // Marca como carregando
    setLoadingIds((prev) => [...prev, reuniao._id]);

    try {
      console.log('Payload enviado: ', payload);
      const response = await api.put(
        `encerrar-agendamento/${reuniao._id}`,
        payload
      );
      // Retorna o objeto correto, seja ele `response.data.agendamento` ou `response.data`
      const agendamentoAtualizado = response.data.agendamento || response.data;

      console.log("✅ Agendamento atualizado:", agendamentoAtualizado);
      alert("Agendamento encerrado com sucesso!");

      return { sucesso: true, agendamento: agendamentoAtualizado };
    } catch (error) {
      console.error("❌ Erro ao encerrar agendamento:", error);
      alert("Erro ao encerrar o agendamento. Tente novamente.");
      throw error;
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== reuniao._id));
    }
  };

  const isLoading = (id) => loadingIds.includes(id);

  return { encerrarAgendamento, loadingIds, isLoading };
}
