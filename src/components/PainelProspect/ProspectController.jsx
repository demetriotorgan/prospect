import React, { useState } from 'react'
import './ProspectController.css'
import api from '../../util/api';
import { useAuth } from '../../context/authContext';

const ProspectController = ({empresas,onAtualizarEmpresa}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nota, setNota] = useState(0);
  const [resultado, setResultado] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataReuniao, setDataReuniao] = useState('');
  const [tempoGasto, setTempoGasto] = useState(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro]= useState(null);

  //hooks
  const {user} = useAuth();
  const empresaAtual = empresas[currentIndex];

  const resetForm = ()=>{
    setNota(0);
    setResultado('')
    setPrioridade('');
    setObservacao('');
    setDataReuniao('');
  };

  const handleSalvarProspeccao = async()=>{
    const empresaAtual = empresas[currentIndex];

    const payload = {
      empresaId: empresaAtual._id,
      usuarioId: user._id,
      indicador: resultado,
      observacao: observacao || "",
      tempoGasto: Number(tempoGasto) || 0,
      criadoEm: new Date(),
      interesse:nota || 0,
      retornoAgendado:  resultado === "ligou-agendou-reuniao" ? dataReuniao : null,
      funil:prioridade || "topo",
    }

    try {
      setLoading(true);
      const {data} = await api.post('/salvar-prospec', payload);      
      console.log('Prospecçãoa cadastrada com sucesso', data);
      
      // Atualiza status da empresa no estado global
      onAtualizarEmpresa(empresaAtual._id, resultado);

      alert(
    ` ✅ Prospecção salva com sucesso!
      Empresa: ${empresaAtual.nome}
      Resultado: ${payload.indicador}
      Prioridade: ${payload.funil}
      Interesse: ${payload.interesse}
      Observação: ${payload.observacao || "Nenhuma"}
      ${payload.retornoAgendado ? `Reunião agendada para: ${payload.retornoAgendado}` : "Sem Agendamento"}`
      );

      // Reposicionar a tela no elemento h3
    const elementoH3 = document.getElementById('empresa-prospec');
    elementoH3.scrollIntoView({ behavior: 'smooth', block: 'start' });

      //Avançar para proxima prospec
      if(currentIndex < empresas.length -1){
        setCurrentIndex((prev)=>prev +1);
        resetForm();        
      }else{
        alert("✅ Todas as empresas foram prospectadas!");
      }
    } catch (error) {
       console.error("Erro ao salvar:", error);
        setErro("Erro ao salvar prospecção. Tente novamente.");
    }finally{
       setLoading(false);
    }
  };

if(!empresaAtual) return <p>Nenhuma empresa para prospectar</p>


  //-----------------------------------------------
  const handleNota = (notaSelecionada) => {
    setNota(notaSelecionada);
  };

  const handleResultado = (e) => {
    setResultado(e.target.value);
    if(e.target.value === 'ligou-agendou-reuniao'){
      setPrioridade('meio');
    }else if(e.target.value === 'ligou-sem-interesse'){
       setPrioridade('fundo');
    } else{
      setPrioridade('');
    }
  };

  return (
    <div className='prospect-controller'>
      <h3 id='empresa-prospec'>Prospectando: {empresaAtual.nome}</h3>
        <p>Prospectados: {currentIndex}</p>
      <div className='info-basicas'>
        <h4>Informações Básicas</h4>
        <p><strong>Empresa ID:</strong> {empresaAtual._id}</p>
        <p><strong>User ID:</strong> {user._id}</p>
        <p><strong>Status:</strong> {empresaAtual.statusAtual}</p>        
      </div>

      <div className='info-empresa'>
        <h4>Dados da Empresa</h4>
        <p><strong>Nome:</strong> {empresaAtual.nome} </p>
        <p><strong>Endereço:</strong> {empresaAtual.endereco}</p>
        <p><strong>Cidade:</strong> {empresaAtual.cidade}</p>
        <p><strong>Bairro:</strong> {empresaAtual.bairro}</p>
        <p><strong>Estado:</strong> {empresaAtual.estado}</p>
      </div>

      <div className='info-telefone'>
        <h4>Telefone</h4>
        <p>{empresaAtual.telefone || "Sem Telefone"}</p>
      </div>
      <div className='resultados-prospec'>
        <select value={resultado} onChange={handleResultado}>
          <option value="">--Resultados--</option>
          <option value="nao-prospectado">Não Prospectado</option>
          <option value="ligou-nao-era-dono">Atendeu mas não era o dono</option>
          <option value="ligou-sem-interesse">Não teve interesse</option>
          <option value="ligou-pediu-retorno">Pediu retorno</option>
          <option value="ligou-agendou-reuniao">Agendou reunião</option>
          <option value="ligou-nao-respondeu">Não atendeu</option>
        </select>

        {resultado === 'ligou-agendou-reuniao' && 
        (<input 
        type='date'
        value={dataReuniao}
        onChange={(e) => setDataReuniao(e.target.value)}
        />)}       

        <label>
          Observação: 
        <input type='text'
        value={observacao}
        onChange={(e)=> setObservacao(e.target.value)}
        placeholder='Digite aqui sua observação...' />
        </label>

      <div className='avaliar-prospec'>
      <h4>Avalie o interesse:</h4>
      <div className="nota-buttons">
    {[1, 2, 3, 4, 5].map((notaAtual) => (
      <button
        type='button'
        key={notaAtual}
        onClick={() => handleNota(notaAtual)}
        className={`nota-button ${nota === notaAtual ? 'selected' : ''}`}
      >
        {notaAtual}
      </button>
    ))}
  </div>
      {nota && <p>Nota selecionada: {nota}</p>}
      </div>

    <select value={prioridade} onChange={(e)=>setPrioridade(e.target.value)} >      
      <option value="topo">Topo</option>
      <option value="meio">Meio</option>
      <option value="fundo">Fundo</option>
    </select>
    <button onClick={handleSalvarProspeccao} disabled={loading}>
      {loading ? "Salvando..." : "Salvar e próxima"}
    </button>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      </div>
  </div>
  )
}

export default ProspectController