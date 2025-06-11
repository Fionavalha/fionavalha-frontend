import { Home, Wallet, Pencil } from "lucide-react";

export default function HotBar() {
  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-around items-center h-10">
      <button className="flex flex-col items-centerblu  text-textPrimary hover:text-blue-500">
        <Home className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center text-textPrimary hover:text-blue-500">
        <Wallet className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center text-textPrimary hover:text-blue-500">
        <Pencil className="w-6 h-6" />
      </button>
    </div>
  );
}
