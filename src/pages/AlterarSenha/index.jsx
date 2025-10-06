import React, { useState } from "react";
import { alterarSenha } from "../../services/api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { CircleArrowLeft } from "lucide-react";

export default function AlterarSenha() {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const navigate = useNavigate();

  async function handleTrocarSenha(e) {
    e.preventDefault();
    try {
      const response = await alterarSenha(localStorage.getItem("id"), senhaAntiga, senhaNova);
      toast.success(response.mensagem);
      navigate("/inicio");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <section className="h-svh flex flex-col">
      <Link to={-1} className="p-2">
        <CircleArrowLeft className="text-white w-10 h-10 cursor-pointer hover:text-brand-primary" />
      </Link>
      <main className="flex flex-col justify-center items-center bg-ui-background grow">
        <form onSubmit={handleTrocarSenha} className="flex flex-col gap-y-6 items-center px-2 w-full max-w-96 text-white">
          <h1 className="heading-1">Alterar Senha</h1>
          <section className="flex flex-col gap-y-3 w-full">
            <div className="flex flex-col">
              <label htmlFor="senhaAntiga">Senha Antiga</label>
              <input value={senhaAntiga} onChange={(e) => setSenhaAntiga(e.target.value)} className="input-base h-10" id="senhaAntiga" type="password" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="senhaNova">Senha Nova</label>
              <input value={senhaNova} onChange={(e) => setSenhaNova(e.target.value)} className="input-base h-10" id="senhaNova" type="password" />
            </div>
          </section>
          <button className="botao-base w-full h-10 bg-brand-primary">Alterar</button>
        </form>
      </main>
    </section>
  );
}
