import { useEffect, useState, useCallback } from "react";
import api from "../../util/api";

const useTodosAgendamentos = () => {
  const [todosAgendamentos, setTodosAgendamentos] = useState([]);
  const [carregandoTodosAgendamentos, setCarregandoTodosAgendamentos] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarTodosAgendamentos = useCallback(async () => {
    setCarregandoTodosAgendamentos(true);
    setErro(null);
    try {
      const response = await api.get("/listar-agendamentos-salvos");
      setTodosAgendamentos(response.data);
    } catch (error) {
      console.error("❌ Erro ao carregar todos os agendamentos:", error);
      setErro(error);
    } finally {
      setCarregandoTodosAgendamentos(false);
    }
  }, []);

  useEffect(() => {
    carregarTodosAgendamentos();
  }, [carregarTodosAgendamentos]);

  return {
    todosAgendamentos,
    carregandoTodosAgendamentos,
    erro,
    setTodosAgendamentos,     // ✅ agora pode atualizar o estado localmente (ex: após PUT)
    carregarTodosAgendamentos // ✅ opcional: recarregar tudo da API
  };
};

export default useTodosAgendamentos;
