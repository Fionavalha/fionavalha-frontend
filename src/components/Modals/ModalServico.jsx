import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  adicionarServicoRealizado,
  consultarAdicionais,
  consultarBarbas,
  consultarCabelos,
  consultarFormasPagamento,
  consultarSobrancelhas,
  editarServicoRealizado,
  excluirServicoRealizado,
} from "../../services/api";
import { useEffect, useState, useMemo } from "react";
import { AlertaConfirmacao } from "../AlertaConfirmacao";
import { toast } from "sonner";

export function ModalServico({ editar, isModalOpen, setIsModalOpen, dataServico }) {
  const [dataCabelos, setDataCabelos] = useState([]);
  const [cabelo, setCabelo] = useState(null);

  const [dataBarbas, setDataBarbas] = useState([]);
  const [barba, setBarba] = useState(null);

  const [dataSobrancelhas, setDataSobrancelhas] = useState([]);
  const [sobrancelha, setSobrancelha] = useState(null);

  const [dataAdicionais, setDataAdicionais] = useState([]);
  const [adicional, setAdicional] = useState(null);

  const [dataFormasPagamento, setDataFormasPagamento] = useState([]);
  const [formaPagamento, setFormaPagamento] = useState(null);

  const [isModalExcluir, setIsModalExcluir] = useState(false);

  const [desconto, setDesconto] = useState("0");
  const [tipoDesconto, setTipoDesconto] = useState("R$");

  const adicionalValorPagamento = formaPagamento?.adicional_forma_pagamento || 0;
  const subtotal =
    Number(cabelo?.valor_cabelo || 0) +
    Number(barba?.valor_barba || 0) +
    Number(sobrancelha?.valor_sobrancelha || 0) +
    Number(adicional?.valor_adicional || 0) +
    Number(adicionalValorPagamento || 0);

  const valorDescontoCalculado = useMemo(() => {
    const valorParseado = parseFloat(desconto.replace(",", ".")) || 0;
    if (valorParseado <= 0) return 0;

    if (tipoDesconto === "R$") {
      return valorParseado;
    } else {
      return (subtotal * valorParseado) / 100;
    }
  }, [desconto, tipoDesconto, subtotal]);

  const valorTotalFinal = Math.max(0, subtotal - valorDescontoCalculado);

  function verificarCampo() {
    if (!cabelo && !barba && !sobrancelha && !adicional) {
      toast.error("Escolha o tipo de serviço");
      return false;
    }
    if (!formaPagamento) {
      toast.error("Escolha a forma de pagamento");
      return false;
    }
    toast.success("Serviço Incluído");
    return true;
  }

  async function listarCabelos() {
    const response = await consultarCabelos();
    setDataCabelos(response);
  }

  async function listarBarbas() {
    const response = await consultarBarbas();
    setDataBarbas(response);
  }

  async function listarSobrancelhas() {
    const response = await consultarSobrancelhas();
    setDataSobrancelhas(response);
  }

  async function listarAdicionais() {
    const response = await consultarAdicionais();
    setDataAdicionais(response);
  }

  async function listarFormasPagamento() {
    const response = await consultarFormasPagamento();
    setDataFormasPagamento(response);
  }

  async function listarServicos() {
    await Promise.all([listarCabelos(), listarBarbas(), listarSobrancelhas(), listarAdicionais(), listarFormasPagamento()]);
  }

  async function handleConfirmar() {
    if (!verificarCampo()) return;

    const itens = [];
    if (cabelo) itens.push({ tipo: "cabelo", item_id: cabelo.id_cabelo, valor_item: Number(cabelo.valor_cabelo) });
    if (barba) itens.push({ tipo: "barba", item_id: barba.id_barba, valor_item: Number(barba.valor_barba) });
    if (sobrancelha) itens.push({ tipo: "sobrancelha", item_id: sobrancelha.id_sobrancelha, valor_item: Number(sobrancelha.valor_sobrancelha) });
    if (adicional) itens.push({ tipo: "adicional", item_id: adicional.id_adicional, valor_item: Number(adicional.valor_adicional) });

    try {
      if (editar) {
        await editarServicoRealizado(dataServico[0].id_servico_realizado, formaPagamento.id_forma_pagamento, valorTotalFinal, itens);
      } else {
        await adicionarServicoRealizado(formaPagamento.id_forma_pagamento, valorTotalFinal, itens);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error);
    }
  }

  async function handleExcluir() {
    await excluirServicoRealizado(dataServico[0].id_servico_realizado);
    toast.success("Serviço excluído com sucesso!");
    setIsModalOpen(false);
  }

  function normalizarDataServico(lista) {
    if (!lista || lista.length === 0) return null;

    const base = {
      formaPagamento: {
        id_forma_pagamento: lista[0].forma_pagamento_id,
        nome_pagamento: lista[0].nome_pagamento,
      },
      valor_total: lista[0].valor_total,
      data_servico_realizado: lista[0].data_servico_realizado,
      cabelo: null,
      barba: null,
      sobrancelha: null,
      adicional: null,
    };

    lista.forEach((item) => {
      if (item.tipo === "cabelo") base.cabelo = { id_cabelo: item.item_id, valor_cabelo: item.valor_item, nome_cabelo: item.nome_item };
      if (item.tipo === "barba") base.barba = { id_barba: item.item_id, valor_barba: item.valor_item, nome_barba: item.nome_item };
      if (item.tipo === "sobrancelha") base.sobrancelha = { id_sobrancelha: item.item_id, valor_sobrancelha: item.valor_item, nome_sobrancelha: item.nome_item };
      if (item.tipo === "adicional") base.adicional = { id_adicional: item.item_id, valor_adicional: item.valor_item, nome_adicional: item.nome_item };
    });

    return base;
  }

  useEffect(() => {
    listarServicos();
  }, []);

  useEffect(() => {
    if (!editar || !dataServico || dataServico.length === 0) return;

    const normalizado = normalizarDataServico(dataServico);

    setCabelo(normalizado.cabelo ? dataCabelos.find((c) => c.id_cabelo === normalizado.cabelo.id_cabelo) : null);
    setBarba(normalizado.barba ? dataBarbas.find((b) => b.id_barba === normalizado.barba.id_barba) : null);
    setSobrancelha(normalizado.sobrancelha ? dataSobrancelhas.find((s) => s.id_sobrancelha === normalizado.sobrancelha.id_sobrancelha) : null);
    setAdicional(normalizado.adicional ? dataAdicionais.find((a) => a.id_adicional === normalizado.adicional.id_adicional) : null);
    setFormaPagamento(normalizado.formaPagamento ? dataFormasPagamento.find((f) => f.id_forma_pagamento === normalizado.formaPagamento.id_forma_pagamento) : null);
  }, [editar, dataServico, dataCabelos, dataBarbas, dataSobrancelhas, dataAdicionais, dataFormasPagamento]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertaConfirmacao
        isModalOpen={isModalExcluir}
        setIsModalOpen={setIsModalExcluir}
        titulo="Atenção"
        descricao="Tem certeza que deseja excluir esse serviço?"
        confirmar="Confirmar"
        cancelar="Cancelar"
        variant="destructive"
        onConfirm={handleExcluir}
        onCancel={() => setIsModalExcluir(false)}
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="heading-2 text-center">{editar ? "Editar Serviço" : "Adicionar Serviço"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <section className="flex flex-col gap-y-2 py-2">
          {/* Cabelo */}
          <div className="flex flex-col">
            <label htmlFor="cabelo" className="text-body-bold">
              Cabelo
            </label>
            <select value={cabelo?.id_cabelo || ""} onChange={(e) => setCabelo(dataCabelos.find((c) => c.id_cabelo === Number(e.target.value)))} id="cabelo" className="input-base h-10">
              <option value="">Selecione</option>
              {dataCabelos.map((item) => (
                <option key={item.id_cabelo} value={item.id_cabelo}>
                  {item.nome_cabelo} (R$ {item.valor_cabelo})
                </option>
              ))}
            </select>
          </div>

          {/* Barba */}
          <div className="flex flex-col">
            <label htmlFor="barba" className="text-body-bold">
              Barba
            </label>
            <select value={barba?.id_barba || ""} onChange={(e) => setBarba(dataBarbas.find((b) => b.id_barba === Number(e.target.value)))} id="barba" className="input-base h-10">
              <option value="">Selecione</option>
              {dataBarbas.map((item) => (
                <option key={item.id_barba} value={item.id_barba}>
                  {item.nome_barba} (R$ {item.valor_barba})
                </option>
              ))}
            </select>
          </div>

          {/* Sobrancelha */}
          <div className="flex flex-col">
            <label htmlFor="sobrancelha" className="text-body-bold">
              Sobrancelha
            </label>
            <select
              value={sobrancelha?.id_sobrancelha || ""}
              onChange={(e) => setSobrancelha(dataSobrancelhas.find((s) => s.id_sobrancelha === Number(e.target.value)))}
              id="sobrancelha"
              className="input-base h-10"
            >
              <option value="">Selecione</option>
              {dataSobrancelhas.map((item) => (
                <option key={item.id_sobrancelha} value={item.id_sobrancelha}>
                  {item.nome_sobrancelha} (R$ {item.valor_sobrancelha})
                </option>
              ))}
            </select>
          </div>

          {/* Adicional */}
          <div className="flex flex-col">
            <label htmlFor="adicional" className="text-body-bold">
              Adicional
            </label>
            <select
              value={adicional?.id_adicional || ""}
              onChange={(e) => setAdicional(dataAdicionais.find((a) => a.id_adicional === Number(e.target.value)))}
              id="adicional"
              className="input-base h-10"
            >
              <option value="">Selecione</option>
              {dataAdicionais.map((item) => (
                <option key={item.id_adicional} value={item.id_adicional}>
                  {item.nome_adicional} (R$ {item.valor_adicional})
                </option>
              ))}
            </select>
          </div>

          {/* Forma de Pagamento */}
          <div className="flex flex-col">
            <label htmlFor="pagamento" className="text-body-bold">
              Pagamento
            </label>
            <select
              value={formaPagamento?.id_forma_pagamento || ""}
              onChange={(e) => setFormaPagamento(dataFormasPagamento.find((f) => f.id_forma_pagamento === Number(e.target.value)))}
              id="pagamento"
              className="input-base h-10"
            >
              <option value="">Selecione</option>
              {dataFormasPagamento.map((item) => (
                <option key={item.id_forma_pagamento} value={item.id_forma_pagamento}>
                  {item.nome_pagamento}
                </option>
              ))}
            </select>
          </div>

          {/* Desconto e Valor Total */}
          <section className="grid grid-cols-3 gap-x-2">
            {/* Tipo de Desconto */}
            <div className="flex flex-col">
              <label htmlFor="tipoDesconto" className="text-body-bold">
                Tipo Desc.
              </label>
              <select id="tipoDesconto" value={tipoDesconto} onChange={(e) => setTipoDesconto(e.target.value)} className="input-base h-10">
                <option value="R$">R$</option>
                <option value="%">%</option>
              </select>
            </div>

            {/* Valor do Desconto */}
            <div className="flex flex-col">
              <label htmlFor="desconto" className="text-body-bold">
                Desconto
              </label>
              <input
                id="desconto"
                value={desconto}
                type="text"
                inputMode="decimal"
                className="input-base h-10"
                onChange={(e) => setDesconto(e.target.value)}
              />
            </div>

            {/* Valor Total Final */}
            <div className="flex flex-col">
              <label htmlFor="valortotal" className="text-end text-body-bold">
                Valor Total
              </label>
              <input
                id="valortotal"
                value={valorTotalFinal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                readOnly
                type="text"
                className="input-base h-10 text-end pr-2 bg-gray-200 text-body-bold"
              />
            </div>
          </section>
        </section>

        <DialogFooter>
          <section className="flex justify-between gap-4">
            <DialogClose asChild>
              <button className="botao-base bg-text-secondary text-white w-full py-2 px-4">Cancelar</button>
            </DialogClose>
            <button onClick={handleConfirmar} type="submit" className="botao-base bg-brand-primary text-white w-full py-2 px-4">
              Confirmar
            </button>
          </section>

          {editar && (
            <button type="button" onClick={() => setIsModalExcluir(true)} className="botao-base bg-feedback-error text-white w-full py-2 px-4">
              Excluir
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
