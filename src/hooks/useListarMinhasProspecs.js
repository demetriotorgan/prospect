import { useEffect, useState } from 'react';
import api from '../util/api';
import { useAuth } from '../context/authContext';

export default function useListarMinhasProspecs() {
  const { user } = useAuth();
  const [prospecs, setProspecs] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarProspecs = async () => {
      if (!user?._id) return;
      setCarregando(true);
      try {
        const response = await api.get('listar-prospec');
        const todasProspecs = response.data;
        const minhasProspecs = todasProspecs.filter(
          (item) => item.usuarioId === user._id
        );
        setProspecs(minhasProspecs);
      } catch (error) {
        console.error('Erro ao carregar prospecções', error);
        setErro(error);
      } finally {
        setCarregando(false);
      }
    };

    carregarProspecs();
  }, [user?._id]);

  return { prospecs, setProspecs, carregando, erro };
}
