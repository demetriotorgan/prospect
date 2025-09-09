import { useState } from "react";
import * as XLSX from "xlsx";
import { padronizarTexto } from "../util/textUtil";
import { agruparPorNicho } from "../util/agrupamento";

const useTransformarPlanilha = () => {
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
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const transformado = jsonData
          .filter((item) => item.Telefone && item.Telefone.trim() !== "")
          .map((item) => {
            const cidade = padronizarTexto(item["cidade"] || "");
            const estado = padronizarTexto(item["estado"] || "");

            if (!cidade || !estado) {
              throw new Error(
                `Cidade ou Estado não preenchidos em "${item["nome do estabelecimento"] || "Sem nome"}".`
              );
            }
            return {
              nome: item["nome do estabelecimento"] || "",
              tipo: item["tipo"] || "Não informado",
              endereco: item["endereço"] || "",
              telefone: item["Telefone"] || "",
              site: item["SITE"] || "",
              cidade,
              bairro: padronizarTexto(item["bairro"] || ""),
              estado,
            };
          });

        setDataTransformada(transformado);

        // Agrupar empresas por tipo de nicho
        const agrupado = agruparPorNicho(transformado);
        setNichos(agrupado);
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
