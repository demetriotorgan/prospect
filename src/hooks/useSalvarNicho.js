import { useCallback, useState } from "react";
import api from "../util/api";

const useSalvarNicho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const salvarNicho = useCallback(async (nicho) => {
    try {
      setLoading(true);
      const payload = { tipo: nicho };
      const response = await api.post('/salvar-nicho', payload);
      setSuccess(true);
      setLoading(false);
      alert('Nicho cadastrado com sucesso!');
      // console.log(response);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Erro ao salvar nicho', error);
    }
  }, []);

  return { salvarNicho, loading, error, success };
};

export default useSalvarNicho;
