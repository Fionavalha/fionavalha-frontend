export default function CardServico({ nome, horario, valor, formaPagamento, id_servico, onClick = () => {}, tipo }) {
  return (
    <>
      <section
        onClick={() => {
          onClick(id_servico);
        }}
        className="w-9/10 max-w-90 h-auto rounded-lg bg-white p-2 cursor-pointer shadow-md"
      >
        <div className="flex justify-between items-center">
          <p className="text-text-primary text-body-bold">{nome}</p>
          <p className="text-text-secondary">{horario}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text-secondary">{formaPagamento}</p>
          <p className={`${tipo === "despesa" ? "text-feedback-error" : "text-feedback-success"} text-body-bold`}>
            {Number(valor)?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </section>
    </>
  );
}
