import { Home, Wallet, Pencil } from "lucide-react";

export default function Rodape({ ativo }) {
  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-around items-center h-10">
      <button className={`flex flex-col items-center ${ativo === "home" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}>
        <Home className="w-6 h-6" />
      </button>
      <button className={`flex flex-col items-center ${ativo === "financeiro" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}>
        <Wallet className="w-6 h-6" />
      </button>
      <button className={`flex flex-col items-center ${ativo === "editar" ? "text-brand-primary" : "text-text-primary hover:text-brand-primary"}`}>
        <Pencil className="w-6 h-6" />
      </button>
    </div>
  );
}
