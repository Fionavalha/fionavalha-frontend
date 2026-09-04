import React, { useState, useEffect } from "react";
import {
  CardsResumo,
  GraficoAnual,
  SeletorDeAno,
} from "./components/Anual";
import {
  ListaAnual,
  ListaDespesas,
  ListaReceitas,
  ListaReceitasFormaPagamento,
  ListaTotal,
} from "./components/Lista";
import {
  consultarAnosComDados,
  consultarDespesas,
  consultarReceitas,
  consultarReceitasFormaPagamento,
  consultarResumoAnual,
} from "../../services/api";
import Rodape from "../../components/Rodape";
import { Button } from "../../components/ui/button";
import ModalPeriodoPersonalizado from "../../components/Modals/ModalPeriodoPersonalizado";
import { formatarDataPtBr, formatarDinheiro } from "../../utils/formatador";
import { Calendar, X } from "lucide-react";

const ANO_ATUAL = new Date().getFullYear();

function formatarDataLocal(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export default function Financas() {
  const [dadosReceitas, setDadosReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState({ valor_total: 0 });
  const [dadosDespesas, setDadosDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState({ valor_total: 0 });
  const [total, setTotal] = useState("R$ 0,00");
  const [dadosReceitasFormaPagamento, setDadosReceitasFormaPagamento] =
    useState([]);
  const [isModalAberto, setIsModalAberto] = useState(false);

  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [botaoFiltro, setBotaoFiltro] = useState("hoje");

  const [modoAnual, setModoAnual] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState(ANO_ATUAL);
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);
  const [resumoAnual, setResumoAnual] = useState([]);
  const [carregandoAnual, setCarregandoAnual] = useState(false);
  const [mesExpandido, setMesExpandido] = useState(null);
  const [detalhePorMes, setDetalhePorMes] = useState({});

  function filtrarPor(filtro) {
    const hoje = new Date();

    switch (filtro) {
      case "hoje": {
        setModoAnual(false);
        setBotaoFiltro("hoje");
        setDataInicial(new Date(hoje.setHours(0, 0, 0, 0)));
        setDataFinal(new Date(hoje.setHours(23, 59, 59, 999)));
        break;
      }

      case "ontem": {
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        setModoAnual(false);
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
        setModoAnual(false);
        setBotaoFiltro("mesAtual");
        setDataInicial(inicioMes);
        setDataFinal(fimMes);
        break;
      }

      case "anual": {
        setModoAnual(true);
        setMesExpandido(null);
        setBotaoFiltro("anual");
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
    setModoAnual(false);
    setDataInicial(pdataInicial);
    setDataFinal(pdataFinal);
    setIsModalAberto(false);
  }

  function sairDoAnual() {
    setModoAnual(false);
    setBotaoFiltro("hoje");
    setMesExpandido(null);
    setDataInicial(new Date());
    setDataFinal(new Date());
  }

  async function listarReceitas(inicio, fim) {
    const response = await consultarReceitas(
      formatarDataLocal(inicio),
      formatarDataLocal(fim)
    );
    setDadosReceitas(response?.cortes || []);
    setTotalReceitas(response?.total_geral || { valor_total: 0 });
  }

  async function listarReceitasFormaPagamento(inicio, fim) {
    const response = await consultarReceitasFormaPagamento(
      formatarDataLocal(inicio),
      formatarDataLocal(fim)
    );
    setDadosReceitasFormaPagamento(response || []);
  }

  async function listarDespesas(inicio, fim) {
    const response = await consultarDespesas(
      formatarDataLocal(inicio),
      formatarDataLocal(fim)
    );
    setDadosDespesas(response?.despesas || []);
    setTotalDespesas(response?.total_geral || { valor_total: 0 });
  }

  async function buscarResumoAnual(ano) {
    setCarregandoAnual(true);
    setResumoAnual([]);
    setMesExpandido(null);
    setDetalhePorMes({});
    const resultados = await consultarResumoAnual(ano);
    setResumoAnual(resultados || []);
    setCarregandoAnual(false);
  }

  async function buscarDetalheMes(mes) {
    if (detalhePorMes[mes]) return;

    const inicio = `${anoSelecionado}-${String(mes + 1).padStart(2, "0")}-01`;
    const fim = `${anoSelecionado}-${String(mes + 1).padStart(2, "0")}-${new Date(
      anoSelecionado,
      mes + 1,
      0
    ).getDate()}`;

    const receitasResponse = await consultarReceitas(inicio, fim);
    const despesasResponse = await consultarDespesas(inicio, fim);

    setDetalhePorMes((prev) => ({
      ...prev,
      [mes]: {
        receitas: receitasResponse || { cortes: [], total_geral: { valor_total: 0 } },
        despesas: despesasResponse || { despesas: [], total_geral: { valor_total: 0 } },
      },
    }));
  }

  useEffect(() => {
    const anoInicialNoMount = ANO_ATUAL;
    let ativo = true;
    consultarAnosComDados().then((anos) => {
      if (!ativo) return;
      setAnosDisponiveis(anos);
      if (
        anos.length > 0 &&
        !anos.includes(anoInicialNoMount)
      ) {
        setAnoSelecionado(anos[anos.length - 1]);
      }
    });
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!modoAnual) return;
    buscarResumoAnual(anoSelecionado);
  }, [modoAnual, anoSelecionado]);

  useEffect(() => {
    if (modoAnual) return;
    listarReceitas(dataInicial, dataFinal);
    listarDespesas(dataInicial, dataFinal);
    listarReceitasFormaPagamento(dataInicial, dataFinal);
  }, [dataInicial, dataFinal, modoAnual]);

  useEffect(() => {
    const totalCalc =
      (Number(totalReceitas?.valor_total) || 0) -
      (Number(totalDespesas?.valor_total) || 0);
    setTotal(formatarDinheiro(totalCalc));
  }, [totalReceitas, totalDespesas]);

  return (
    <>
      <ModalPeriodoPersonalizado
        isOpen={isModalAberto}
        setIsOpen={setIsModalAberto}
        onClick={handleFiltroPersonalizado}
      />

      <section className="flex flex-col items-center h-screen">
        <section className="flex justify-end gap-x-2 px-2 mt-4 w-full sm:w-1/2">
          <Button
            variant="outline"
            className={
              botaoFiltro === "hoje"
                ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white"
                : ""
            }
            onClick={() => filtrarPor("hoje")}
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            className={
              botaoFiltro === "ontem"
                ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white"
                : ""
            }
            onClick={() => filtrarPor("ontem")}
          >
            Ontem
          </Button>
          <Button
            variant="outline"
            className={
              botaoFiltro === "mesAtual"
                ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white"
                : ""
            }
            onClick={() => filtrarPor("mesAtual")}
          >
            Mês A.
          </Button>
          <Button
            variant="outline"
            className={
              botaoFiltro === "anual"
                ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white"
                : ""
            }
            onClick={() => filtrarPor("anual")}
          >
            Ano
          </Button>
          <Button
            variant="outline"
            className={
              botaoFiltro === "personalizado"
                ? "bg-brand-primary text-white hover:bg-brand-primary hover:text-white"
                : ""
            }
            onClick={() => setIsModalAberto(true)}
          >
            <Calendar />
          </Button>
        </section>

        {modoAnual ? (
          <>
            <div className="flex items-center gap-3 mt-4 w-full sm:w-1/2 px-2">
              <SeletorDeAno
                anoSelecionado={anoSelecionado}
                anos={anosDisponiveis}
                onChange={setAnoSelecionado}
              />
              <Button
                variant="ghost"
                className="text-white"
                onClick={sairDoAnual}
              >
                <X size={16} className="mr-1" /> Detalhe
              </Button>
            </div>

            <p className="text-white mt-2 text-sm">
              Relatório do ano {anoSelecionado}
            </p>

            <div className="flex flex-col items-center w-full overflow-y-auto gap-5 pb-12">
              {carregandoAnual ? (
                <div className="mt-8 text-white animate-pulse">
                  Carregando relatório anual...
                </div>
              ) : resumoAnual.length === 0 ? (
                <div className="mt-8 text-white">Sem dados para {anoSelecionado}.</div>
              ) : (
                <>
                  <CardsResumo
                    receitas={resumoAnual.reduce(
                      (acc, item) => acc + item.receitas,
                      0
                    )}
                    despesas={resumoAnual.reduce(
                      (acc, item) => acc + item.despesas,
                      0
                    )}
                  />
                  <div className="w-full px-2">
                    <GraficoAnual resumoAnual={resumoAnual} />
                  </div>
                  <ListaAnual
                    resumoAnual={resumoAnual}
                    buscarDetalheMes={buscarDetalheMes}
                    mesExpandido={mesExpandido}
                    setMesExpandido={setMesExpandido}
                    detalhePorMes={detalhePorMes}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-white mt-4">
              {formatarDataPtBr(formatarDataLocal(dataInicial))} até{" "}
              {formatarDataPtBr(formatarDataLocal(dataFinal))}
            </p>

            <div className="flex flex-col items-center w-full overflow-y-auto gap-5 pb-12">
              <CardsResumo
                receitas={Number(totalReceitas?.valor_total) || 0}
                despesas={Number(totalDespesas?.valor_total) || 0}
              />
              <ListaReceitas data={dadosReceitas} total={totalReceitas} />
              <ListaReceitasFormaPagamento data={dadosReceitasFormaPagamento} />
              <ListaDespesas data={dadosDespesas} total={totalDespesas} />
              <ListaTotal total={total} />
            </div>
          </>
        )}

        <Rodape ativo="financas" />
      </section>
    </>
  );
}
