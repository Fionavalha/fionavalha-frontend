import React, { useEffect, useState } from "react";
import HomeCardCorte from "./HomeCardCorte";
import { consultarAdicionais, consultarBarbas, consultarCabelos, consultarSobrancelhas } from "../../../services/api";

export default function HomeServicos() {
  const [cortesCabelos, setCortesCabelos] = useState([]);
  const [cortesBarbas, setCortesBarbas] = useState([]);
  const [cortesSobrancelhas, setCortesSobrancelhas] = useState([]);
  const [cortesAdicionais, setCortesAdicionais] = useState([]);

  async function listarCortes() {
    const cacheKey = "cortesCache";
    const cacheExpiracao = 4 * 60 * 60 * 1000;

    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < cacheExpiracao) {
        setCortesCabelos(data.cabelos);
        setCortesBarbas(data.barbas);
        setCortesSobrancelhas(data.sobrancelhas);
        setCortesAdicionais(data.adicionais);
        return;
      }
    }

    try {
      const responseCabelos = await consultarCabelos();
      const responseBarbas = await consultarBarbas();
      const responseSobrancelhas = await consultarSobrancelhas();
      const responseAdicionais = await consultarAdicionais();

      setCortesCabelos(responseCabelos);
      setCortesBarbas(responseBarbas);
      setCortesSobrancelhas(responseSobrancelhas);
      setCortesAdicionais(responseAdicionais);

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: {
            cabelos: responseCabelos,
            barbas: responseBarbas,
            sobrancelhas: responseSobrancelhas,
            adicionais: responseAdicionais,
          },
          timestamp: Date.now(),
        })
      );
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
              Na Barbearia Fio Navalha, cada serviço é feito com atenção e
              cuidado, sempre com aquele clima de barbearia de verdade.
            </p>
          </div>

          <section className="flex flex-col gap-y-4 px-2">
            <div className="flex flex-wrap justify-center gap-5">
              {cortesCabelos.map((item) => (
                <HomeCardCorte
                  key={item.nome_cabelo}
                  nome={item.nome_cabelo}
                  alt={item.nome_cabelo}
                  img={`/images/${item.nome_cabelo}.webp`}
                  preco={"R$ " + item.valor_cabelo}
                />
              ))}
              {cortesBarbas.map((item) => (
                <HomeCardCorte
                  key={item.nome_barba}
                  nome={item.nome_barba}
                  alt={item.nome_barba}
                  img={`/images/${item.nome_barba}.webp`}
                  preco={"R$ " + item.valor_barba}
                />
              ))}
              {cortesSobrancelhas.map((item) => (
                <HomeCardCorte
                  key={item.nome_sobrancelha}
                  nome={item.nome_sobrancelha}
                  alt={item.nome_sobrancelha}
                  img={`/images/${item.nome_sobrancelha}.webp`}
                  preco={"R$ " + item.valor_sobrancelha}
                />
              ))}
              {cortesAdicionais.map((item) => (
                <HomeCardCorte
                  key={item.nome_adicional}
                  nome={item.nome_adicional}
                  alt={item.nome_adicional}
                  img={`/images/${item.nome_adicional}.webp`}
                  preco={"R$ " + item.valor_adicional}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
