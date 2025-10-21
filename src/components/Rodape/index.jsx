import { Home, Wallet, Pencil } from "lucide-react";
import { useNavigate } from "react-router";

export default function Rodape({ ativo }) {
  const navigate = useNavigate();

  function handleIcone(icone) {
    if (icone === "inicio" && ativo !== "inicio") navigate("/inicio")
    if (icone === "financas" && ativo !== "financas") navigate("/financas")
    if (icone === "ajustes" && ativo !== "ajustes") navigate("/ajustes")
  }

  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-around items-center h-10">
      <button
        onClick={() => handleIcone("inicio")}
        className={`flex flex-col items-center ${ativo === "inicio" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}
      >
        <Home className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleIcone("financas")}
        className={`flex flex-col items-center ${ativo === "financas" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}
      >
        <Wallet className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleIcone("ajustes")}
        className={`flex flex-col items-center ${ativo === "ajustes" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}
      >
        <Pencil className="w-6 h-6" />
      </button>
    </div>
  );
}
