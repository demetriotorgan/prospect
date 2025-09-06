import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import './EnviarPlanilha.css'
import useCarregarNichos from '../../hooks/useCarregarNichos'

const EnviarPlanilha = () => {
    const [data, setData] = useState([]);
    const [dataTransformada, setDataTransformada] = useState([]);
    const [processando, setProcessando] = useState(false);
    const [nichos, setNichos] = useState({});
    const [nichoSelecionado, setNichoSelecionado] = useState({});
    const {nichoOptions} = useCarregarNichos();

    //Atualizar escolha do usuario
    const handleSelecionarNicho = (tipo, valor)=>{
        setNichoSelecionado(prev =>({
            ...prev,
            [tipo]:valor
        }));
    };

    //Enviar as empresas de um card específico
    const handleEnviarNicho = async(tipo)=>{
        const nichoGeral = nichoSelecionado[tipo];
        if(!nichoGeral){
            alert('Selecione um nicho antes de enviar');
            return;
        }

        const empresas = nichos[tipo].map(emp=>({
            ...emp,
            tipo:nichoGeral
        }));

        try {
            //await api.post('/salvar-dados', empresas);
            console.log(empresas);
            alert(`Dados de ${tipo} enviados com sucesso`);
        } catch (error) {
            alert("Erro ao enivar dados");
        }
    }

    //Funçao para padronizar cidades e estados
    const padronizarTexto = (texto) =>{
        if(!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };


    const handleExtract = (e)=>{
    setProcessando(true);
    const file = e.target.files[0];
    const reader = new FileReader();

     reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);

      //Transformação (T do ETL)
      const transformado = jsonData
      .filter(item => item.Telefone && item.Telefone.trim() !== "")
      .map(item => ({
        nome:item["nome do estabelecimento"] || "",
        tipo: item["tipo"] || "",
        endereco:item["endereço"] || "",
        telefone: item["Telefone"] || "",
        site:item["SITE"] || "",
        cidade: padronizarTexto(item["cidade"] || ""),
        estado:padronizarTexto(item["estado"] || "")
      }));
      setDataTransformada(transformado);

      //Agrupando por Nicho
      const agrupado = transformado.reduce((acc, empresa)=>{
        const tipo = empresa.tipo || "Não informado";
        if(!acc[tipo]){
            acc[tipo] = [];
        }
        acc[tipo].push(empresa);
        return acc;
      },{});
      setNichos(agrupado);
      setProcessando(false);
    };    
    reader.readAsArrayBuffer(file);    
};

  return (
    <div className='envio-planilha'>
    <div className='campos-envio-container'>
      <h2>Enviar Planilha de dados</h2>
      <input type='file' onChange={handleExtract} />      
    </div>
    <div className='painel-envio'>
      {processando ? (
        <p>Processando...</p>
      ) : (
        <>
        <p>Total de Empresas: {dataTransformada.length}</p>
        <p>Total de Nichos: {Object.keys(nichos).length}</p>

        {Object.entries(nichos).map(([tipo, empresas])=>(
            <div key={tipo} className='nicho-card'>
                <h4>{tipo}({empresas.length})</h4>
                 {/* Caixa de seleção para Nicho Geral */}
    <label>Escolher Nicho Geral:</label>
    <select
      value={nichoSelecionado[tipo] || ""}
      onChange={(e) => handleSelecionarNicho(tipo, e.target.value)}
    >
      <option value="">-- Selecione --</option>
      {nichoOptions.length > 0 && nichoOptions.map((nicho, index)=>(
        <option key={index} value={nicho.tipo}>{nicho.tipo}</option>
      ))}
    </select>
    
    {/* Botão para enviar */}
    <button 
      className="btn-enviar"
      onClick={() => handleEnviarNicho(tipo)}>
      Enviar
    </button>
                    <ul>
                    {empresas.map((empresa, index)=>(
                        <li key={index}>
                            {empresa.nome} - {empresa.cidade}/{empresa.estado}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        </>
      )}
    </div>
  </div>
  )
}

export default EnviarPlanilha