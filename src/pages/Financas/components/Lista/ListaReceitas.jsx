import { formatarDinheiro } from "../../../../utils/formatador";
import CardContainer from "./CardContainer";

export default function ListaReceitas({ data = [], total = null }) {
  return (
    <section className="w-full sm:max-w-1/2 flex flex-col gap-2 px-2">
      <header className="bg-text-primary p-3 text-white font-medium rounded-md">
        Receitas
      </header>

      {data?.length > 0 ? (
        data.map((item) => (
          <CardContainer key={item?.nome}>
            <div className="flex justify-between items-center">
              <span className="text-text-primary font-medium">{item?.nome}</span>
              <span className="text-text-primary font-bold">
                {formatarDinheiro(Number(item?.valor_total))}
              </span>
            </div>
            <div className="text-xs text-text-secondary mt-0.5">
              QTD: {item?.qtd}
            </div>
          </CardContainer>
        ))
      ) : (
        <CardContainer className="text-center text-text-secondary text-sm">
          Nenhuma receita no período.
        </CardContainer>
      )}

      {total && (
        <CardContainer className="flex justify-between items-center">
          <span className="font-bold text-text-primary">TOTAL</span>
          <div className="text-right">
            <span className="text-xs text-text-secondary mr-2">
              QTD: {total?.qtd}
            </span>
            <span className="font-bold">
              {formatarDinheiro(Number(total?.valor_total))}
            </span>
          </div>
        </CardContainer>
      )}
    </section>
  );
}
