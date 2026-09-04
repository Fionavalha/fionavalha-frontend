import { formatarDinheiro } from "../../../../utils/formatador";
import CardContainer from "./CardContainer";

export default function ListaReceitasFormaPagamento({ data = [] }) {
  return (
    <section className="w-full sm:max-w-1/2 flex flex-col gap-2 px-2">
      <header className="bg-text-primary p-3 text-white font-medium rounded-md">
        Receitas Formas Pagamento
      </header>

      {data?.length > 0 ? (
        data.map((item) => (
          <CardContainer key={item?.nome}>
            <div className="flex justify-between items-center">
              <span className="text-text-primary font-medium">
                {item?.nome_pagamento}
              </span>
              <span className="text-text-primary font-bold">
                {formatarDinheiro(Number(item?.total))}
              </span>
            </div>
            <div className="text-xs text-text-secondary mt-0.5">
              QTD: {item?.quantidade}
            </div>
          </CardContainer>
        ))
      ) : (
        <CardContainer className="text-center text-text-secondary text-sm">
          Nenhuma forma de pagamento no período.
        </CardContainer>
      )}
    </section>
  );
}
