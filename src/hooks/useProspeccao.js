import { useEffect, useRef, useState } from 'react';
import api from '../util/api';
import { montarPayload, formatarMensagem } from '../util/prospecUtils';

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
      const { data } = await api.post('/salvar-prospec', payload);

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

