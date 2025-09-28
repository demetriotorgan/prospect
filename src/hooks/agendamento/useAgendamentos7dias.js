import { useEffect, useState } from "react";
import api from "../../util/api";
import axios from 'axios'

const useAgendamentos7Dias = ()=>{
    const [agendamentos, setAgendamentos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const response = await api.get('/agenda/proximos-7-dias');
      setAgendamentos(response.data);
    } catch (error) {
      setErro(error);
      console.error('Erro ao carregar agendamentos', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(()=>{
    carregarAgendamentos();
  },[]);

    return { agendamentos, erro, carregando, recarregar: carregarAgendamentos };

};

export default useAgendamentos7Dias