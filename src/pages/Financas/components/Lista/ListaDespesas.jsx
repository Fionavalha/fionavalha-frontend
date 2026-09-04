import { formatarDataPtBr, formatarDinheiro } from "../../../../utils/formatador";
import CardContainer from "./CardContainer";

export default function ListaDespesas({ data = [], total = null }) {
  return (
    <section className="w-full sm:max-w-1/2 flex flex-col gap-2 px-2">
      <header className="bg-text-primary p-3 text-white font-medium rounded-md">
        Despesas
      </header>

      {data?.length > 0 ? (
        data.map((item) => (
          <CardContainer key={item?.id_despesa}>
            <div className="flex justify-between items-center">
              <span className="text-text-primary font-medium">
                {item?.nome_despesa}
              </span>
              <span className="text-text-primary font-bold">
                {formatarDinheiro(Number(item?.valor_despesa))}
              </span>
            </div>
            <div className="text-xs text-text-secondary mt-0.5 flex items-center gap-2">
              <span>{formatarDataPtBr(item?.data_despesa)}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] rounded bg-muted text-text-secondary font-semibold uppercase">
                {item?.fixa === "S" ? "Fixa" : "Variável"}
              </span>
            </div>
          </CardContainer>
        ))
      ) : (
        <CardContainer className="text-center text-text-secondary text-sm">
          Nenhuma despesa no período.
        </CardContainer>
      )}

      {total && (
        <CardContainer className="flex justify-between items-center">
          <span className="font-bold text-text-primary">TOTAL</span>
          <span
            className={`font-bold ${
              Number(total?.valor_total) > 0
                ? "text-feedback-error"
                : "text-text-primary"
            }`}
          >
            {formatarDinheiro(Number(total?.valor_total))}
          </span>
        </CardContainer>
      )}
    </section>
  );
}
