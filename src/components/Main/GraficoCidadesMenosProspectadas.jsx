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

const GraficoCidadesMenosProspectadas = ({ cidades }) => {
  // Prepara os dados para o gráfico
  const data = cidades.map((c) => ({
    name: c.cidade,
    total: c.quantidade,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip formatter={(value) => [`${value}`, "Não prospectadas"]} />
        <Bar dataKey="total" fill="#f87171" radius={[8, 8, 0, 0]}>
          <LabelList dataKey="total" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoCidadesMenosProspectadas;
