export default function CardServico({ tipoCorte = "", horario = "", valor = "", formaPagamento = "" }) {
  return (
    <>
      <section className="w-72 min-h-14 rounded-lg bg-white p-2">
        <div className="flex justify-between items-center">
          <p className="text-text-primary text-body-bold">{tipoCorte}</p>
          <p className=" text-text-secondary">{horario}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text-secondary">{formaPagamento}</p>
          <p className="text-feedback-success text-body-bold">
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
