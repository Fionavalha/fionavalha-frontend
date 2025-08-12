export function formatarDinheiro(valor) {
  return valor?.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function desformatarDinheiro(valorFormatado) {
  if (valorFormatado === null) return;

  const valorNumero = parseFloat(
    valorFormatado
      .replace(/\s?R\$\s?/, "") // Remove "R$" e possíveis espaços
      .replace(/\./g, "") // Remove pontos (milhares)
      .replace(",", ".") // Troca vírgula por ponto (decimal)
  );
  return valorNumero;
}

export function formatarDataISO(data) {
  return data?.toISOString().split("T")[0];
}

export function formatarDataPtBr(dataIso) {
  if (dataIso === "" || dataIso === undefined || dataIso === null) return;
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia}/${mes}/${ano}`;
}
