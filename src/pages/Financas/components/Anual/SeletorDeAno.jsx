export default function SeletorDeAno({
  anoSelecionado,
  onChange,
  anos = [],
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white text-sm">Ano:</span>
      {anos.length > 0 ? (
        <select
          value={anoSelecionado}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-white text-text-primary rounded-md px-2 py-1 border border-text-secondary focus:outline-brand-primary text-sm"
        >
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      ) : (
        <span className="text-white/70 text-sm">Carregando...</span>
      )}
    </div>
  );
}
