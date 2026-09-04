import { formatarDinheiro } from "../../../../utils/formatador";

const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function GraficoAnual({ resumoAnual = [] }) {
  const maxValor = Math.max(
    ...resumoAnual.flatMap((item) => [item.receitas, item.despesas]),
    1
  );

  return (
    <div className="bg-white w-full rounded-lg shadow-sm p-3 mt-4">
      <h3 className="text-text-primary font-bold text-sm mb-3">
        Receitas x Despesas por mês
      </h3>

      <div className="flex items-end gap-1 h-40">
        {resumoAnual.map((item) => {
          const alturaReceitas =
            (item.receitas / maxValor) * 100 > 0
              ? Math.max((item.receitas / maxValor) * 100, 3)
              : 0;
          const alturaDespesas =
            (item.despesas / maxValor) * 100 > 0
              ? Math.max((item.despesas / maxValor) * 100, 3)
              : 0;

          return (
            <div
              key={item.mes}
              className="flex-1 flex flex-col items-center justify-end h-full"
              title={`${MESES[item.mes]} - Receitas: ${formatarDinheiro(
                item.receitas
              )} | Despesas: ${formatarDinheiro(item.despesas)}`}
            >
              <div className="flex gap-[2px] items-end h-full w-full justify-center">
                <div
                  className="w-[45%] max-w-3 rounded-t-sm bg-feedback-success"
                  style={{ height: `${alturaReceitas}%` }}
                />
                <div
                  className="w-[45%] max-w-3 rounded-t-sm bg-feedback-error"
                  style={{ height: `${alturaDespesas}%` }}
                />
              </div>
              <span className="text-[8px] text-text-secondary mt-1">
                {MESES[item.mes]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-3 text-xs text-text-secondary">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 inline-block bg-feedback-success rounded-sm" />
          Receitas
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 inline-block bg-feedback-error rounded-sm" />
          Despesas
        </span>
      </div>
    </div>
  );
}
