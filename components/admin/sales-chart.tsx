"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", vendas: 4000, pedidos: 240 },
  { name: "Fev", vendas: 3000, pedidos: 198 },
  { name: "Mar", vendas: 5000, pedidos: 300 },
  { name: "Abr", vendas: 2780, pedidos: 190 },
  { name: "Mai", vendas: 1890, pedidos: 130 },
  { name: "Jun", vendas: 2390, pedidos: 150 },
  { name: "Jul", vendas: 3490, pedidos: 210 },
]

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            formatter={(value, name) => {
              if (name === "vendas") return [`R$ ${value}`, "Vendas"]
              return [value, "Pedidos"]
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="vendas" name="Vendas (R$)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar
            yAxisId="right"
            dataKey="pedidos"
            name="Pedidos"
            fill="hsl(var(--primary) / 0.3)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
