import React, { useState } from "react";
import CardServico from "../../components/cardServico";
import HotBar from "../../footer";

export default function Home() {
  const dados = [
    {
      id: 1,
      formaPagamento: "Debito",
      horario: "09:31",
      valor: 40.0,
      tipoCorte: "DEGRADÊ NAVALHADO",
    },
    {
      id: 2,
      formaPagamento: "Credito",
      horario: "14:22",
      valor: 55.0,
      tipoCorte: "Degrade Navalhado e Sobrancelha",
    },
    {
      id: 3,
      formaPagamento: "Dinheiro",
      horario: "13:17",
      valor: 55.0,
      tipoCorte: "Degrade Navalhado e Sobrancelha",
    },
    {
      id: 4,
      formaPagamento: "Dinheiro",
      horario: "14:52",
      valor: 85.0,
      tipoCorte: "Degrade Navalhado, Barba e Sobrancelha",
    },
    {
      id: 5,
      formaPagamento: "Dinheiro",
      horario: "16:03",
      valor: 35.0,
      tipoCorte: "Social e Risquinho",
    },
    {
      id: 6,
      formaPagamento: "Credito",
      horario: "09:16",
      valor: 30.0,
      tipoCorte: "BARBA",
    },
    {
      id: 7,
      formaPagamento: "Pix",
      horario: "15:26",
      valor: 5.0,
      tipoCorte: "RISQUINHO",
    },
    {
      id: 8,
      formaPagamento: "Pix",
      horario: "14:21",
      valor: 70.0,
      tipoCorte: "Degrade Navalhado e Barba",
    },
    {
      id: 9,
      formaPagamento: "Dinheiro",
      horario: "14:22",
      valor: 70.0,
      tipoCorte: "Degrade Navalhado e Barba",
    },
    {
      id: 10,
      formaPagamento: "Debito",
      horario: "11:12",
      valor: 65.0,
      tipoCorte: "Degrade e Barba",
    },
    {
      id: 11,
      formaPagamento: "Pix",
      horario: "18:03",
      valor: 50.0,
      tipoCorte: "Degrade e Sobrancelha",
    },
    {
      id: 12,
      formaPagamento: "Dinheiro",
      horario: "13:05",
      valor: 35.0,
      tipoCorte: "DEGRADÊ",
    },
    
  ];

  return (
    <>
      <div className="flex flex-col h-screen bg-bg relative">
        <div className=" bottom-17 left-0 right-0 mx-auto h-81 overflow-y-auto flex flex-col items-center gap-y-3.5">
          {dados.map((item) => (
            <div key={item.id}>
              <CardServico formaPagamento={item.formaPagamento} horario={item.horario} valor={item?.valor} tipoCorte={item.tipoCorte} />
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-full z-50">
          <HotBar />
        </div>
      </div>
    </>
  );
}
