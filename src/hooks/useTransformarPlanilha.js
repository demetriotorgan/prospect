import { useState } from "react";
import * as XLSX from "xlsx";
import { padronizarTexto } from "../util/textUtil";
import { agruparPorNicho } from "../util/agrupamento";

const useTransformarPlanilha = (verificarEmpresas) => {
  const [dataTransformada, setDataTransformada] = useState([]);
  const [nichos, setNichos] = useState({});
  const [error, setError] = useState(null);
  const [processando, setProcessando] = useState(false);

  const transformarArquivo = (file) => {
    setError(null);
    setDataTransformada([]);
    setNichos({});

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        setProcessando(true);
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: ""});

    // Verifica se o jsonData não está vazio
    if (jsonData.length === 0) {
      alert("A planilha está vazia.");
    }

    // Verifica se as colunas estão corretas
    const colunasEsperadas = [
      "nome do estabelecimento",
      "tipo",
      "endereço",
      "telefone",
      "site",
      "cidade",
      "bairro",
      "estado",
    ];
    const colunasReais = Object.keys(jsonData[0]);

    if (colunasReais.length !== colunasEsperadas.length ||
      !colunasEsperadas.every((coluna, index) => coluna === colunasReais[index])) { 
        alert("A planilha não está no formato correto. Verifique se as colunas estão na ordem certa. 1- nome do estabelecimento 2- tipo 3- endereço 4-telefone 5-site 6-cidade 7-bairro 8-estado")
        setProcessando(false);
        return;
    };        
        console.log('JSON: ',jsonData);

        const transformado = jsonData
          .filter((item) => {
            return(
            item["nome do estabelecimento"].trim() !=="" &&
            item["tipo"].trim() !== "" &&
            item["endereço"].trim() !== "" &&            
            item.telefone.trim() !== "" && 
            item.cidade.trim() !== "" &&            
            item.estado.trim() !== ""
            );
            })
          .map((item) => {
            const cidade = padronizarTexto(item["cidade"] || "Não Informado");
            const estado = padronizarTexto(item["estado"] || "Não Informado");

            return {
              nome: item["nome do estabelecimento"],
              tipo: item["tipo"],
              endereco: item["endereço"],
              telefone: item["telefone"],
              site: item["site"] || "",
              cidade,
              bairro: padronizarTexto(item["bairro"] || ""),
              estado,
            };
          });

        console.log('Transformados', transformado);
        setDataTransformada(transformado);

        // Agrupar empresas por tipo de nicho
        const agrupado = agruparPorNicho(transformado);
        setNichos(agrupado);

        //Chama verificação de empresas já existentes
        if (verificarEmpresas) {
          verificarEmpresas(transformado);
        }

        setProcessando(false);
      } catch (error) {
        setError(error.message || "Erro ao transformar a planilha.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return { dataTransformada, nichos, setNichos, processando, error, transformarArquivo };
};

export default useTransformarPlanilha;
