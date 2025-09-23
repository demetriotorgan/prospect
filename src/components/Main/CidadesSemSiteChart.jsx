import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

const CidadesSemSiteChart = ({ metricas }) => {
  const dados = metricas.top3CidadesSemSite.map(cidade => ({
    nome: cidade.cidade,
    quantidade: cidade.quantidade,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dados}
        margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantidade" fill="#8884d8">
          <LabelList dataKey="quantidade" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CidadesSemSiteChart;
