export default function CardServico({ tipoCorte, horario, valor, formaPagamento }) {
  return (
    <>
      <section className="  w-72 min-h-14 rounded-lg bg-white p-2 ">
        <div className="flex justify-between items-center">
          <p className="text-textPrimary textoMedioNegrito">{tipoCorte}</p>
          <p className=" text-textSecond">{horario}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-textSecond">{formaPagamento}</p>
          <p className="text-sucess textoMedioNegrito">
            {valor.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </section>
    </>
  );
}
