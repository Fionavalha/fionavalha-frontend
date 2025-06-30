import React, { useEffect, useState } from "react";
import corte1 from "../../../assets/images/corte1.png";
import HomeCardCorte from "./HomeCardCorte";
import { listarCabelos } from "../../../services/api";
import { formatarDinheiro } from "../../../utils/formatador";

export default function HomeServicos() {
  const [cortesCabelos, setCortesCabelos] = useState([]);

  async function listarCortes() {
    try {
      const responseCabelos = await listarCabelos();
      console.log(responseCabelos.data);
      setCortesCabelos(responseCabelos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    listarCortes();
  }, []);

  return (
    <>
      <section className="flex justify-center min-h-svh">
        <div className="container flex flex-col items-center justify-center gap-y-4">
          <div className="flex flex-col items-center text-white px-2 gap-y-4">
            <h2 className="heading-1">Serviços</h2>
            <p className="text-center sm:max-w-168">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem nihil officiis sed magni in reiciendis cupiditate tenetur cumque voluptatum
              quibusdam, consectetur impedit quaerat dicta iusto velit atque enim culpa dolore.
            </p>
          </div>

          <section className="flex flex-col">
            <div className="flex flex-wrap justify-center gap-5">
              {cortesCabelos.map((item) => (
                <HomeCardCorte key={item.id_cabelo} nome={item.nome_cabelo} alt={item.nome_cabelo} img={corte1} preco={formatarDinheiro(item.valor_cabelo)} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
