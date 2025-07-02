import React, { useState } from "react";
import { efetuarLogin } from "../../services/api";
import { useNavigate } from "react-router";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate()


  async function handleEntrar(e) {
    e.preventDefault()
    const response = await efetuarLogin(nome, senha);
    if (response ) {
     navigate("/inicio")
    } else {
      console.log("algo incorreto kkkkk");
    }
  }

  return (
    <>
      <main className="flex flex-col justify-center items-center bg-ui-background w-screen h-svh">
        <form onSubmit={handleEntrar} className="flex flex-col gap-y-6 items-center px-2 w-full max-w-96 text-white ">
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
    </>
  );
}
