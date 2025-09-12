import { useEffect, useRef, useState } from 'react';
import api from '../util/api';
import { montarPayload, formatarMensagem } from '../util/prospecUtils';
import { useAuth } from '../context/authContext';

export function useProspeccao({ empresas, currentIndex, setCurrentIndex, user, onAtualizarEmpresa }) {
  const [nota, setNota] = useState(0);
  const [resultado, setResultado] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataReuniao, setDataReuniao] = useState('');
  const [tempoGasto, setTempoGasto] = useState(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  //---Cronometro
  const intervalRef = useRef(null);

  //incia cronometro
  useEffect(()=>{
if (empresas[currentIndex]) {
      setTempoGasto(0); // reseta para nova prospecção
      intervalRef.current = setInterval(() => {
        setTempoGasto((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current); // limpa ao trocar de empresa
  },[currentIndex, empresas]);

  const resetForm = () => {
    setNota(0);
    setResultado('');
    setPrioridade('');
    setObservacao('');
    setDataReuniao('');
  };

  const handleNota = (notaSelecionada) => setNota(notaSelecionada);

  const handleResultado = (e) => {
    const valor = e.target.value;
    setResultado(valor);
    if (valor === 'ligou-agendou-reuniao') setPrioridade('meio');
    else if (valor === 'ligou-sem-interesse') setPrioridade('fundo');
    else setPrioridade('');
  };

  const handleSalvarProspeccao = async () => {
    const empresaAtual = empresas[currentIndex];
    if (!resultado) {
      alert('Por favor, selecione um resultado');
      return;
    }
    setErro('');

    const payload = montarPayload({ empresa: empresaAtual, user, resultado, observacao, tempoGasto, nota, dataReuniao, prioridade });

    try {
      setLoading(true);
        // 1. salvar prospecção principal
        try {
            await api.post('/salvar-prospec', payload);      
        } catch (error) {
            console.error('❌ Erro ao salvar prospecção:', err);
            setErro('Erro ao salvar dados da prospecção.');
            return; // se não salvar a prospecção, não faz sentido continuar
        }
      
      // 2. salvar tempo de prospecção
      try {
      await api.post('/tempo-prospec', {
        userID: user._id,
        tempoProspec: tempoGasto
      });  
      } catch (err) {
         console.error('⚠️ Erro ao salvar tempo de prospecção:', err);
      // aqui não retorno, pq pode ser interessante a prospecção ficar salva mesmo sem o tempo
      setErro('Tempo não foi registrado, mas a prospecção foi salva.');
      }
      
      // 3. atualizar interface
      onAtualizarEmpresa(empresaAtual._id, resultado);
      alert(formatarMensagem(payload, empresaAtual));
      
      clearInterval(intervalRef.current); //para o cronometro ao salvar

      if (currentIndex < empresas.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        resetForm();
      } else {
        alert('✅ Todas as empresas foram prospectadas!');
        setTempoGasto(0);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErro('Erro ao salvar prospecção. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    nota,
    resultado,
    prioridade,
    observacao,
    dataReuniao,
    tempoGasto,
    loading,
    erro,
    setObservacao,
    setDataReuniao,
    setPrioridade,
    handleNota,
    handleResultado,
    handleSalvarProspeccao,
  };
}

