import { useState } from 'react';
import api from '../../util/api';

const useSalvarAgendamento = ({resultado,setResultado, texto, setTexto}) => {
  const [salvando, setSalvando] = useState(false);

  const salvarAgendamento = async (reuniao) => {
    if (!window.confirm("Deseja salvar o agendamento?")) {
      console.log("Operação cancelada pelo usuário.");
      return null;
    }

    try {
      setSalvando(true);

      const payload = {
        empresaId: reuniao.empresaId || "",
        nomeEmpresa: reuniao.nomeEmpresa || "",
        usuarioId: reuniao.usuarioId || "",
        usuarioNome: reuniao.usuarioNome || "",
        criadoEm: reuniao.criadoEm || new Date().toISOString(),
        dataTime: reuniao.dataTime || "",
        diasRestantes: reuniao.diasRestantes || "",
        funil: reuniao.funil || "",
        indicador: reuniao.indicador || "",
        interesse: reuniao.interesse ?? 0,
        nicho: reuniao.nicho || "",
        observacao: reuniao.observacao || "",
        retornoAgendado: reuniao.retornoAgendado || "",
        site: reuniao.site || "",
        telefone: reuniao.telefone || "",
        tempoGasto: reuniao.tempoGasto ?? 0,
        resultado: resultado,
        texto:texto,
      };

      const response = await api.post('/salvar-agendamento', payload);
      console.log("✅ Agendamento salvo:", response.data);
      setTexto('');
      setResultado('');
      return response.data;

    } catch (error) {
      console.error("❌ Erro ao salvar agendamento:", error);

      // 🔎 Tratamento específico para erro 409 (Conflito)
      if (error.response?.status === 409) {
        const msg = error.response.data?.msg || "Esta empresa já possui um agendamento.";
        alert(`⚠️ ${msg}`);
        return { success: false, conflict: true, msg };
      }

      // ⚠️ Outros erros genéricos
      alert("❌ Ocorreu um erro ao salvar o agendamento. Tente novamente mais tarde.");
      return { success: false, msg: error.message };
    } finally {
      setSalvando(false);
    }
  };

  return { salvarAgendamento, salvando };
};

export default useSalvarAgendamento;
