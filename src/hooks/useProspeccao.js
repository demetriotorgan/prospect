import { useEffect, useRef, useState } from 'react';
import api from '../util/api';
import { montarPayload, formatarMensagem } from '../util/prospecUtils';
import { useAuth } from '../context/authContext';
import axios from 'axios';

export function useProspeccao({ empresas, currentIndex, setCurrentIndex, user, onAtualizarEmpresa,setShowProspectController }) {
  const [nota, setNota] = useState(0);
  const [resultado, setResultado] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataReuniao, setDataReuniao] = useState('');
  const [dataTime, setDataTime] = useState('');
  const [tempoGasto, setTempoGasto] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // 🔎 objeto de erros por campo
  const [erros, setErros] = useState({
    resultado: null,
    observacao: null,
    nota: null,
    dataReuniao:null,
    dataTime:null,
    geral:null,
  });

  //---Cronometro
  const intervalRef = useRef(null);

  // Sincroniza resultado e prioridade com a empresa atual
  useEffect(() => {
    const empresaAtual = empresas[currentIndex];
    if (empresaAtual) {
      setResultado(empresaAtual.statusAtual || '');
      if (empresaAtual.statusAtual === 'ligou-agendou-reuniao') setPrioridade('meio');
      else if (empresaAtual.statusAtual === 'ligou-sem-interesse') setPrioridade('fundo');
      else setPrioridade('');
      setNota(0);
      setObservacao('');
      setDataReuniao('');
      setTempoGasto(0);
      setErros({ resultado: null, observacao: null, nota: null, dataReuniao:null, dataTime:null, geral:null });
    }
  }, [currentIndex, empresas]);

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
    setDataTime('');
    setErros({ resultado: null, observacao: null, nota: null });
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

    // validações
    const novosErros = {
      resultado: !resultado ? "Selecione um resultado." : null,
      observacao: !observacao.trim() ? "A observação não pode estar vazia." : null,
      nota: !nota ? "Selecione uma nota de interesse (1 a 5)." : null,
       dataReuniao: (resultado === 'ligou-agendou-reuniao' && !dataReuniao.trim()) 
        ? "Informe a data da reunião agendada." 
        : null,
      geral: null,
    };

    setErros(novosErros);

     // se existir erro, não continua
    if (Object.values(novosErros).some((msg) => msg !== null)) {
      return;
    }
    
    const payload = montarPayload({ empresa: empresaAtual, user, resultado, observacao, tempoGasto, nota, dataReuniao, dataTime, prioridade });

    // 🔎 Log para debug
   console.log("📦 Payload enviado para API:", payload);
// console.log("➡️ Empresa atual:", empresaAtual);

    try {
      setLoading(true);
      await api.post("/salvar-prospec", payload);     

      try {
        await api.post("/tempo-prospec", {
          userID: user._id,
          tempoProspec: tempoGasto,
        });
      } catch (err) {
        console.error("⚠️ Erro ao salvar tempo:", err);
      }

      onAtualizarEmpresa(empresaAtual._id, resultado);
      alert(formatarMensagem(payload, empresaAtual));

      clearInterval(intervalRef.current);

      if (currentIndex < empresas.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        resetForm();
      } else {
        alert("✅ Todas as empresas foram prospectadas!");
        setTempoGasto(0);
        setShowProspectController(false);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setErros((prev) => ({ ...prev, geral: "Erro ao salvar prospecção. Tente novamente." }));
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
    dataTime,
    tempoGasto,
    loading,
    erros,
    setObservacao,
    setDataReuniao,
    setDataTime,
    setPrioridade,
    handleNota,
    handleResultado,
    handleSalvarProspeccao,
  };
}

