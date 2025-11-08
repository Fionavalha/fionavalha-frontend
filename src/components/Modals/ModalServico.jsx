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
import { MinusCircleIcon } from "lucide-react";
import { CirclePlusIcon } from "lucide-react";

export function ModalServico({ editar, isModalOpen, setIsModalOpen, dataServico }) {
  const [dataCabelos, setDataCabelos] = useState([]);
  const [dataBarbas, setDataBarbas] = useState([]);
  const [dataSobrancelhas, setDataSobrancelhas] = useState([]);
  const [dataAdicionais, setDataAdicionais] = useState([]);
  const [dataFormasPagamento, setDataFormasPagamento] = useState([]);

  const [itens, setItens] = useState([]);
  const [selectValues, setSelectValues] = useState({
    cabelo: "",
    barba: "",
    sobrancelha: "",
    adicional: "",
  });
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [desconto, setDesconto] = useState("0");
  const [tipoDesconto, setTipoDesconto] = useState("R$");

  const [isModalExcluir, setIsModalExcluir] = useState(false);

  async function listarServicos() {
    try {
      await Promise.all([
        consultarCabelos().then(setDataCabelos),
        consultarBarbas().then(setDataBarbas),
        consultarSobrancelhas().then(setDataSobrancelhas),
        consultarAdicionais().then(setDataAdicionais),
        consultarFormasPagamento().then(setDataFormasPagamento),
      ]);
    } catch (error) {
      toast.error("Erro ao carregar dados. Tente novamente.");
      console.error(error);
    }
  }

  function handleSelectChange(e) {
    const { name, value } = e.target;
    setSelectValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddItem(tipo) {
    let itemData;
    let selectedId = selectValues[tipo];

    if (!selectedId) return;

    if (tipo === "cabelo") itemData = dataCabelos.find((i) => i.id_cabelo === Number(selectedId));
    if (tipo === "barba") itemData = dataBarbas.find((i) => i.id_barba === Number(selectedId));
    if (tipo === "sobrancelha") itemData = dataSobrancelhas.find((i) => i.id_sobrancelha === Number(selectedId));
    if (tipo === "adicional") itemData = dataAdicionais.find((i) => i.id_adicional === Number(selectedId));

    if (!itemData) return;

    const novoItem = {
      id_local: `${tipo}-${selectedId}-${Date.now()}`,
      tipo: tipo,
      item_id: Number(selectedId),
      nome_item: itemData.nome_cabelo || itemData.nome_barba || itemData.nome_sobrancelha || itemData.nome_adicional,
      valor_item: Number(itemData.valor_cabelo || itemData.valor_barba || itemData.valor_sobrancelha || itemData.valor_adicional),
    };

    setItens((prevItens) => [...prevItens, novoItem]);
    setSelectValues((prev) => ({ ...prev, [tipo]: "" }));
  }

  function handleRemoveItem(idLocalParaRemover) {
    setItens((prevItens) => prevItens.filter((item) => item.id_local !== idLocalParaRemover));
  }

  const subtotalServicos = useMemo(() => {
    return itens.reduce((total, item) => total + item.valor_item, 0);
  }, [itens]);

  const adicionalValorPagamento = formaPagamento?.adicional_forma_pagamento || 0;
  const subtotal = subtotalServicos + Number(adicionalValorPagamento || 0);

  const valorDescontoCalculado = useMemo(() => {
    const valorParseado = parseFloat(desconto.replace(",", ".")) || 0;
    if (valorParseado <= 0) return 0;
    if (tipoDesconto === "R$") return valorParseado;
    return (subtotal * valorParseado) / 100;
  }, [desconto, tipoDesconto, subtotal]);

  const valorTotalFinal = Math.max(0, subtotal - valorDescontoCalculado);

  async function handleConfirmar() {
    if (itens.length === 0) {
      toast.error("Adicione pelo menos um serviço");
      return;
    }
    if (!formaPagamento) {
      toast.error("Escolha a forma de pagamento");
      return;
    }

    const dadosServico = {
      forma_pagamento_id: formaPagamento.id_forma_pagamento,
      valor_total: valorTotalFinal,
      itens: itens.map((item) => ({
        tipo: item.tipo,
        item_id: item.item_id,
        valor_item: item.valor_item,
      })),
    };

    try {
      if (editar) {
        await editarServicoRealizado(dataServico[0].id_servico_realizado, dadosServico);
        toast.success("Serviço atualizado com sucesso!");
      } else {
        await adicionarServicoRealizado(dadosServico);
        toast.success("Serviço incluído com sucesso!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Erro ao salvar serviço");
    }
  }

  async function handleExcluir() {
    try {
      await excluirServicoRealizado(dataServico[0].id_servico_realizado);
      toast.success("Serviço excluído com sucesso!");
      setIsModalExcluir(false);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Erro ao excluir serviço");
    }
  }

  useEffect(() => {
    listarServicos();
  }, []);

  useEffect(() => {
    if (editar && dataServico && dataServico.length > 0 && dataFormasPagamento.length > 0) {
      const itensIniciais = dataServico.map((item, index) => ({
        id_local: `${item.tipo}-${item.item_id}-${index}`,
        tipo: item.tipo,
        item_id: item.item_id,
        nome_item: item.nome_item,
        valor_item: Number(item.valor_item),
      }));
      setItens(itensIniciais);

      const formaPagamentoInicial = dataFormasPagamento.find((f) => f.id_forma_pagamento === dataServico[0].forma_pagamento_id);
      setFormaPagamento(formaPagamentoInicial || null);

      setDesconto("0");
      setTipoDesconto("R$");
      setSelectValues({ cabelo: "", barba: "", sobrancelha: "", adicional: "" });
    } else if (!editar) {
      setItens([]);
      setFormaPagamento(null);
      setDesconto("0");
      setTipoDesconto("R$");
      setSelectValues({ cabelo: "", barba: "", sobrancelha: "", adicional: "" });
    }
  }, [editar, dataServico, dataFormasPagamento, isModalOpen]);

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

        <section className="flex flex-col gap-y-1 max-h-[70vh] overflow-y-auto pr-2">
          <div
            className="flex flex-col gap-1 p-3 border rounded-md min-h-20 bg-gray-50 
             max-h-40 overflow-y-auto"
          >
            <label className="text-body-bold">Itens do Serviço</label>
            {itens.length === 0 ? (
              <span className="text-sm text-gray-500">Nenhum item adicionado</span>
            ) : (
              itens.map((item) => (
                <div key={item.id_local} className="flex justify-between items-center text-sm py-1">
                  <span className="capitalize">
                    {item.nome_item} (R$ {item.valor_item.toFixed(2)})
                  </span>
                  <button onClick={() => handleRemoveItem(item.id_local)} className="botao-base bg-feedback-error text-white px-4" aria-label="Remover item">
                    -
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cabelo */}
          <div className="flex flex-col">
            <label htmlFor="cabelo" className="text-body-bold">
              Cabelo
            </label>
            <div className="flex gap-2">
              <select name="cabelo" value={selectValues.cabelo} onChange={handleSelectChange} id="cabelo" className="input-base h-10 w-full">
                <option value="">Selecione</option>
                {dataCabelos.map((item) => (
                  <option key={item.id_cabelo} value={item.id_cabelo}>
                    {item.nome_cabelo} (R$ {item.valor_cabelo})
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddItem("cabelo")} className="botao-base bg-brand-primary text-white px-4" aria-label="Adicionar cabelo">
                +
              </button>
            </div>
          </div>

          {/* Barba */}
          <div className="flex flex-col">
            <label htmlFor="barba" className="text-body-bold">
              Barba
            </label>
            <div className="flex gap-2">
              <select name="barba" value={selectValues.barba} onChange={handleSelectChange} id="barba" className="input-base h-10 w-full">
                <option value="">Selecione</option>
                {dataBarbas.map((item) => (
                  <option key={item.id_barba} value={item.id_barba}>
                    {item.nome_barba} (R$ {item.valor_barba})
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddItem("barba")} className="botao-base bg-brand-primary text-white px-4" aria-label="Adicionar barba">
                +
              </button>
            </div>
          </div>

          {/* Sobrancelha */}
          <div className="flex flex-col">
            <label htmlFor="sobrancelha" className="text-body-bold">
              Sobrancelha
            </label>
            <div className="flex gap-2">
              <select name="sobrancelha" value={selectValues.sobrancelha} onChange={handleSelectChange} id="sobrancelha" className="input-base h-10 w-full">
                <option value="">Selecione</option>
                {dataSobrancelhas.map((item) => (
                  <option key={item.id_sobrancelha} value={item.id_sobrancelha}>
                    {item.nome_sobrancelha} (R$ {item.valor_sobrancelha})
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddItem("sobrancelha")} className="botao-base bg-brand-primary text-white px-4" aria-label="Adicionar sobrancelha">
                +
              </button>
            </div>
          </div>

          {/* Adicional */}
          <div className="flex flex-col">
            <label htmlFor="adicional" className="text-body-bold">
              Adicional
            </label>
            <div className="flex gap-2">
              <select name="adicional" value={selectValues.adicional} onChange={handleSelectChange} id="adicional" className="input-base h-10 w-full">
                <option value="">Selecione</option>
                {dataAdicionais.map((item) => (
                  <option key={item.id_adicional} value={item.id_adicional}>
                    {item.nome_adicional} (R$ {item.valor_adicional})
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddItem("adicional")} className="botao-base bg-brand-primary text-white px-4" aria-label="Adicionar adicional">
                +
              </button>
            </div>
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
              <input id="desconto" value={desconto} type="text" inputMode="decimal" className="input-base h-10" onChange={(e) => setDesconto(e.target.value)} />
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

        <DialogFooter className="flex flex-col gap-2 pt-4">
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
