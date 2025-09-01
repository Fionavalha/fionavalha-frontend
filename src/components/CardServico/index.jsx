export default function CardServico({ tipoCorte, horario, valor, formaPagamento, id_servico, onClick = () => {} }) {
  return (
    <>
      <section
        onClick={() => {
          onClick(id_servico);
        }}
        className="w-90 h-auto rounded-lg bg-white p-2 cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <p className="text-text-primary text-body-bold">{tipoCorte}</p>
          <p className="text-text-secondary">{horario}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text-secondary">{formaPagamento}</p>
          <p className="text-feedback-success text-body-bold">
            {valor?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </section>
    </>
  );
}
