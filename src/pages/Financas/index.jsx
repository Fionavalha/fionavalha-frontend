import React, { useState, useEffect } from "react";
import { TabelaDespesas, TabelaReceitas, TabelaTotal } from "./components/Tabela";
import { consultarDespesas, consultarReceitas } from "../../services/api";
import Rodape from "../../components/Rodape";
import { Button } from "../../components/ui/button";
import ModalPeriodoPersonalizado from "../../components/Modals/ModalPeriodoPersonalizado";
import { formatarDataPtBr, formatarDinheiro } from "../../utils/formatador";
import { Calendar } from "lucide-react";

export default function Financas() {
  const [dadosReceitas, setDadosReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState({ valor_total: 0 });
  const [dadosDespesas, setDadosDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState({ valor_total: 0 });
  const [total, setTotal] = useState("R$ 0,00");
  const [isModalAberto, setIsModalAberto] = useState(false);

  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [botaoFiltro, setBotaoFiltro] = useState("hoje");

  function formatarDataLocal(date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  function filtrarPor(filtro) {
    const hoje = new Date();

    switch (filtro) {
      case "hoje": {
        setBotaoFiltro("hoje");
        setDataInicial(new Date(hoje.setHours(0, 0, 0, 0)));
        setDataFinal(new Date(hoje.setHours(23, 59, 59, 999)));
        break;
      }

      case "ontem": {
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        setBotaoFiltro("ontem");
        setDataInicial(new Date(ontem.setHours(0, 0, 0, 0)));
        setDataFinal(new Date(ontem.setHours(23, 59, 59, 999)));
        break;
      }

      case "mesAtual": {
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        inicioMes.setHours(0, 0, 0, 0);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        fimMes.setHours(23, 59, 59, 999);
        setBotaoFiltro("mesAtual");
        setDataInicial(inicioMes);
        setDataFinal(fimMes);
        break;
      }

      default:
        break;
    }
  }

  function handleFiltroPersonalizado(pdataInicial, pdataFinal) {
    pdataInicial.setHours(0, 0, 0, 0);
    pdataFinal.setHours(23, 59, 59, 999);
    setBotaoFiltro("personalizado");
    setDataInicial(pdataInicial);
    setDataFinal(pdataFinal);
    setIsModalAberto(false);
  }

  async function listarReceitas(inicio, fim) {
    const response = await consultarReceitas(formatarDataLocal(inicio), formatarDataLocal(fim));
    setDadosReceitas(response?.cortes || []);
    setTotalReceitas(response?.total_geral || { valor_total: 0 });
  }

  async function listarDespesas(inicio, fim) {
    const response = await consultarDespesas(formatarDataLocal(inicio), formatarDataLocal(fim));
    setDadosDespesas(response?.despesas || []);
    setTotalDespesas(response?.total_geral || { valor_total: 0 });
  }

  useEffect(() => {
    listarReceitas(dataInicial, dataFinal);
    listarDespesas(dataInicial, dataFinal);
  }, [dataInicial, dataFinal]);

  useEffect(() => {
    const totalCalc = (Number(totalReceitas?.valor_total) || 0) - (Number(totalDespesas?.valor_total) || 0);
    setTotal(formatarDinheiro(totalCalc));
  }, [totalReceitas, totalDespesas]);

  return (
    <>
      <ModalPeriodoPersonalizado isOpen={isModalAberto} setIsOpen={setIsModalAberto} onClick={handleFiltroPersonalizado} />

      <section className="flex flex-col items-center h-screen">
        <section className="flex justify-end gap-x-3 px-2 mt-4 w-full sm:w-1/2">
          <Button variant="outline" className={botaoFiltro === "hoje" ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white" : ""} onClick={() => filtrarPor("hoje")}>
            Hoje
          </Button>
          <Button variant="outline" className={botaoFiltro === "ontem" ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white" : ""} onClick={() => filtrarPor("ontem")}>
            Ontem
          </Button>
          <Button variant="outline" className={botaoFiltro === "mesAtual" ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white" : ""} onClick={() => filtrarPor("mesAtual")}>
            Mês A.
          </Button>
          <Button variant="outline" className={botaoFiltro === "personalizado" ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white" : ""} onClick={() => setIsModalAberto(true)}>
            <Calendar />
          </Button>
        </section>

        <p className="text-white mt-4">
          {formatarDataPtBr(formatarDataLocal(dataInicial))} até {formatarDataPtBr(formatarDataLocal(dataFinal))}
        </p>

        <div className="flex flex-col items-center w-full min-h-dvh">
          <TabelaReceitas data={dadosReceitas} total={totalReceitas} />
          <TabelaDespesas data={dadosDespesas} total={totalDespesas} />
          <TabelaTotal total={total} />
        </div>

        <Rodape ativo="financas" />
      </section>
    </>
  );
}
