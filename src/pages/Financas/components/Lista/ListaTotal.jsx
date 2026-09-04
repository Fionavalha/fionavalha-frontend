import { desformatarDinheiro } from "../../../../utils/formatador";
import CardContainer from "./CardContainer";

export default function ListaTotal({ total = null }) {
  const valorNumero = desformatarDinheiro(total) ?? 0;
  const cor =
    valorNumero > 0
      ? "text-feedback-success"
      : valorNumero === 0
      ? "text-text-primary"
      : "text-feedback-error";

  return (
    <CardContainer className="flex justify-between items-center">
      <span className="font-bold text-text-primary">TOTAL</span>
      <span className={`font-bold ${cor}`}>{total}</span>
    </CardContainer>
  );
}
