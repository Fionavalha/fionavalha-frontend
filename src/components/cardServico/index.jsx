export default function CardServico({ tipoCorte, horario, valor, formaPagamento }) {
  return (
    <>
      <section className="  w-72 min-h-14 rounded-lg bg-white">
        <div className="flex justify-between">
          <p className="font-bold">{tipoCorte}</p>
          <p className=" text-textSecond">{horario}</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-textSecond">{formaPagamento}</p>
          <p className="text-green-600">
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
