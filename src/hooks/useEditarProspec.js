// useSalvarProspec.js
import { useState } from "react";
import api from "../util/api";
import { montarPayload } from "../util/prospecHelpers";

export default function useSalvarProspec({ prospec, onAtualizarProspec, setOnModal }) {
  const [loading, setLoading] = useState(false);

  const handleSalvar = async ({
    resultado,
    observacao,
    notaAtual,
    funil,
    data,
    hora,
    onAgendou,
  }) => {
    try {
      setLoading(true);

      const payload = montarPayload({
        prospec,
        resultado,
        observacao,
        notaAtual,
        funil,
        data,
        hora,
        onAgendou,
      });

      // Alertas de confirmação
      if (payload.retornoAgendado && payload.dataTime) {
        const confirmar = window.confirm(
          "⚠️ Você definiu data e hora de retorno.\nUm novo agendamento será criado. Deseja continuar?"
        );
        if (!confirmar) {
          setLoading(false);
          return;
        }
      } else if (!payload.retornoAgendado && !payload.dataTime) {
        const confirmar = window.confirm(
          "⚠️ Nenhuma data e hora de retorno foram definidas.\nO agendamento existente para esta empresa será removido. Deseja continuar?"
        );
        if (!confirmar) {
          setLoading(false);
          return;
        }
      }

      console.log("📦 Payload enviado:", payload);
      const response = await api.put(`atualizar-prospec/${prospec._id}`, payload);

      alert("Prospecção atualizada com sucesso!");

      if (onAtualizarProspec) {
        onAtualizarProspec(response.data.prospecAtualizada);
      }

      setOnModal(false);
    } catch (error) {
      console.error("❌ Erro ao atualizar prospecção:", error);
      alert("Erro ao salvar. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSalvar, loading };
}
