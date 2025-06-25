import React from "react";
import imagemSobre from "../../../assets/images/imagem-sobre.svg";

export default function HomeSobre() {
  return (
    <>
      <section className="flex justify-center items-center px-2 min-h-screen">
        <div className="container flex flex-wrap justify-around items-center px-2">
          <picture>
            <img src={imagemSobre} className="w-96 h-96 sm:w-full sm:h-full" alt="" />
          </picture>
          <section className="flex flex-col max-w-174 gap-y-4">
            <h2 className="heading-1 text-white">Sobre</h2>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, repudiandae dolor alias, neque magnam eaque laudantium non iste ea suscipit nemo
              ut. Similique distinctio molestias et, atque adipisci ex repellendus!
            </p>
            <p className="text-white">
              Horário de funcionamento: <strong>09:00</strong> ás <strong>19:00</strong>
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
