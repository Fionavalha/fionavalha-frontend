import { ChevronDown } from "lucide-react";
import { formatarDinheiro } from "../../../../utils/formatador";
import CardContainer from "./CardContainer";
import ListaReceitas from "./ListaReceitas";
import ListaDespesas from "./ListaDespesas";

const MESES_EXTENSO = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function corPorValor(valor) {
  return valor > 0
    ? "text-feedback-success"
    : valor < 0
    ? "text-feedback-error"
    : "text-text-primary";
}

export default function ListaAnual({
  resumoAnual = [],
  buscarDetalheMes,
  mesExpandido,
  setMesExpandido,
  detalhePorMes = {},
}) {
  const totalReceitas = resumoAnual.reduce(
    (acc, item) => acc + item.receitas,
    0
  );
  const totalDespesas = resumoAnual.reduce(
    (acc, item) => acc + item.despesas,
    0
  );
  const totalSaldo = totalReceitas - totalDespesas;

  const detalhe = mesExpandido !== null ? detalhePorMes[mesExpandido] : undefined;
  const corTotal = corPorValor(totalSaldo);

  return (
    <section className="w-full sm:max-w-1/2 flex flex-col gap-2 px-2">
      <header className="bg-text-primary p-3 text-white font-medium rounded-md">
        Resumo Anual
      </header>

      {resumoAnual.map((item) => {
        const expandido = mesExpandido === item.mes;
        const corMes = corPorValor(item.saldo);

        return (
          <div key={item.mes} className="w-full flex flex-col gap-2">
            <CardContainer
              className={`cursor-pointer ${
                expandido ? "ring-2 ring-brand-primary" : ""
              }`}
            >
              <button
                type="button"
                className="w-full flex justify-between items-center"
                onClick={() => {
                  if (expandido) {
                    setMesExpandido(null);
                  } else {
                    setMesExpandido(item.mes);
                    if (!detalhePorMes[item.mes]) {
                      buscarDetalheMes(item.mes);
                    }
                  }
                }}
              >
                <div className="text-left">
                  <div className="text-text-primary font-medium">
                    {MESES_EXTENSO[item.mes]}
                  </div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    <span className="text-feedback-success">
                      {formatarDinheiro(Number(item.receitas))} rec.
                    </span>{" "}
                    ·{" "}
                    <span className="text-feedback-error">
                      {formatarDinheiro(Number(item.despesas))} desp.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${corMes}`}>
                    {formatarDinheiro(Number(item.saldo))}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-text-secondary transition-transform ${
                      expandido ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            </CardContainer>

            {expandido && (
              <div className="flex flex-col gap-2">
                {detalhe ? (
                  <>
                    <ListaReceitas
                      data={detalhe.receitas?.cortes}
                      total={detalhe.receitas?.total_geral}
                    />
                    <ListaDespesas
                      data={detalhe.despesas?.despesas}
                      total={detalhe.despesas?.total_geral}
                    />
                  </>
                ) : (
                  <CardContainer className="text-center text-sm text-text-secondary animate-pulse">
                    Carregando detalhes de {MESES_EXTENSO[mesExpandido]}...
                  </CardContainer>
                )}
              </div>
            )}
          </div>
        );
      })}

      <CardContainer className="flex justify-between items-center">
        <span className="font-bold text-text-primary">TOTAL DO ANO</span>
        <div className="text-right">
          <span className="text-xs text-text-secondary block">
            Rec. {formatarDinheiro(Number(totalReceitas))}
          </span>
          <span className="text-xs text-text-secondary block">
            Desp. {formatarDinheiro(Number(totalDespesas))}
          </span>
          <span className={`font-bold ${corTotal}`}>
            {formatarDinheiro(Number(totalSaldo))}
          </span>
        </div>
      </CardContainer>
    </section>
  );
}
