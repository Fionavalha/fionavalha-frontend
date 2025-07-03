import React, { useState } from "react";
import { efetuarLogin } from "../../services/api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { CircleArrowLeft } from "lucide-react";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await efetuarLogin(nome, senha);
      toast.success("Login efetuado com sucesso", {
        style: {
          color: "#34c759",
        },
      });
      navigate("/inicio");
    } catch (error) {
      console.error(error);
      toast.error(error, {
        style: {
          color: "#ff3b30",
        },
      });
    }
  }

  return (
    <>
      <section className="h-svh flex flex-col">
        <Link to="/" className="p-2">
          <CircleArrowLeft className="text-white w-10 h-10 cursor-pointer hover:text-brand-primary" />
        </Link>
        <main className="flex flex-col justify-center items-center bg-ui-background grow">
          <form onSubmit={handleLogin} className="flex flex-col gap-y-6 items-center px-2 w-full max-w-96 text-white">
            <h1 className="heading-1">Login</h1>
            <section className="flex flex-col gap-y-3 w-full">
              <div className="flex flex-col">
                <label htmlFor="nome">Nome</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} className="input-base h-10" id="nome" type="text" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="senha">Senha</label>
                <input value={senha} onChange={(e) => setSenha(e.target.value)} className="input-base h-10" id="senha" type="password" />
              </div>
            </section>
            <button className="botao-base w-full h-10 bg-brand-primary">Entrar</button>
          </form>
        </main>
      </section>
    </>
  );
}
