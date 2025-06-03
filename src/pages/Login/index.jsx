import React from "react";

export default function Login() {
  return (
    <>
      <main className="flex flex-col justify-center items-center bg-bg w-screen h-svh">
        <form action="" className="flex flex-col gap-y-6 items-center px-2 w-full max-w-96 text-white ">
          <h1 className="textoPrimario">Login</h1>
          <section className="flex flex-col gap-y-3 w-full">
            <div className="flex flex-col">
              <label htmlFor="nome">Nome</label>
              <input className="inputBase h-10" id="nome" type="text" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="senha">Senha</label>
              <input className="inputBase h-10" id="senha" type="password" />
            </div>
          </section>
          <button className="botaoPrimario w-full h-10">Entrar</button>
        </form>
      </main>
    </>
  );
}
