import axios from 'axios'
import { useEffect, useState } from 'react'
import api from '../util/api';

const useCarregarNichos = ()=>{
    const [nichoOptions, setNichoOptions] = useState([]);
    const [erroNicho, setErroNicho] = useState('');
    const [carregandoNicho, setCarregandoNicho] = useState(false);

    useEffect(() => {
    const fetchNichos = async () => {
      setCarregandoNicho(true);
      try {
        const response = await api.get('/listar-nichos');
        setNichoOptions(response.data);
      } catch (error) {
        setErroNicho('Erro ao carregar nichos');
      } finally {
        setCarregandoNicho(false);
      }
    };

    fetchNichos();
  }, []);
    
    return {nichoOptions, erroNicho, setNichoOptions, carregandoNicho}
};

export default useCarregarNichos;