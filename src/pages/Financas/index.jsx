import React from "react";
import { TabelaDespesas, TabelaReceitas, TabelaTotal } from "./components/Tabela";
import { useState } from "react";
import { useEffect } from "react";
import { consultarDespesas, consultarReceitas } from "../../services/api";

export default function Financas() {
  const [dadosReceitas, setDadosReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState({});
  const [dadosDespesas, setDadosDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState({});
  const [total, setTotal] = useState(null);

  async function listarReceitas() {
    const response = await consultarReceitas();
    setDadosReceitas(response.cortes);
    setTotalReceitas(response.total_geral);
  }

  async function listarDespesas() {
    const response = await consultarDespesas();
    setDadosDespesas(response.despesas);
    setTotalDespesas(response.total_geral);
  }

  useEffect(() => {
    listarReceitas();
    listarDespesas();
  }, []);

  useEffect(() => {
    const total = Number(totalReceitas.valor_total) - Number(totalDespesas.valor_total);
    setTotal(total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
  }, [totalReceitas, totalDespesas]);

  return (
    <>
      <section className="flex flex-col justify-center">
        <TabelaReceitas data={dadosReceitas} total={totalReceitas} />
        <TabelaDespesas data={dadosDespesas} total={totalDespesas} />
        <TabelaTotal total={total} />
      </section>
    </>
  );
}
