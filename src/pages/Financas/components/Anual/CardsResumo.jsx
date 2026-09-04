import { formatarDinheiro } from "../../../../utils/formatador";

export default function CardsResumo({ receitas = 0, despesas = 0 }) {
  const lucro = receitas - despesas;

  const corLucro =
    lucro > 0
      ? "text-feedback-success"
      : lucro < 0
      ? "text-feedback-error"
      : "text-black";

  const cards = [
    { label: "Receitas", valor: receitas, cor: "text-feedback-success" },
    { label: "Despesas", valor: despesas, cor: "text-feedback-error" },
    { label: "Lucro", valor: lucro, cor: corLucro },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 w-full px-2 mt-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-lg shadow-sm p-3 flex flex-col items-center"
        >
          <span className="text-xs text-text-secondary">{card.label}</span>
          <span className={`${card.cor} font-bold text-sm text-center mt-1`}>
            {formatarDinheiro(Number(card.valor))}
          </span>
        </div>
      ))}
    </div>
  );
}
