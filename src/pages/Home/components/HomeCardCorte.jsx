import React from "react";

export default function HomeCardCorte({ img, alt, nome, preco }) {
  return (
    <>
      <div className="max-w-96">
        <img src={img} alt={alt} className="rounded-t-sm" />
        <div className="flex  justify-between items-center px-4 bg-white h-12 rounded-b-sm">
          <p>{nome}</p>

          <div className="flex justify-center rounded bg-feedback-success text-white px-2 font-bold">
            <p>{preco}</p>
          </div>
        </div>
      </div>
    </>
  );
}
