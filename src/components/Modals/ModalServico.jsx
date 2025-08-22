import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { adicionarServicoRealizado, consultarAdicionais, consultarBarbas, consultarCabelos, consultarFormasPagamento, consultarSobrancelhas } from "../../services/api";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "../Alert";
import { toast } from "sonner";

export function ModalServico({ editar, isModalOpen, setIsModalOpen,dataServico   }) {
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

  const [isModalExluir, setIsModalExcluir] = useState(false);

  const adicionalCartao = formaPagamento?.id_forma_pagamento === 3 ? 2 : formaPagamento?.id_forma_pagamento === 4 && 2;
  const valorTotal =
    Number(cabelo?.valor_cabelo || 0) + Number(barba?.valor_barba || 0) + Number(sobrancelha?.valor_sobrancelha || 0) + Number(adicional?.valor_adicional || 0) + Number(adicionalCartao || 0);

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
    await listarCabelos();
    await listarBarbas();
    await listarSobrancelhas();
    await listarAdicionais();
    await listarFormasPagamento();
  }

  async function handleConfimar() {
    if (!verificarCampo()) return;

    const itens = [];

    if (cabelo) itens.push({ tipo: "cabelo", item_id: cabelo.id_cabelo, valor_item: Number(cabelo.valor_cabelo) });
    if (barba) itens.push({ tipo: "barba", item_id: barba.id_barba, valor_item: Number(barba.valor_barba) });
    if (sobrancelha) itens.push({ tipo: "sobrancelha", item_id: sobrancelha.id_sobrancelha, valor_item: Number(sobrancelha.valor_sobrancelha) });
    if (adicional) itens.push({ tipo: "adicional", item_id: adicional.id_adicional, valor_item: Number(adicional.valor_adicional) });

    try {
      await adicionarServicoRealizado(formaPagamento.id_forma_pagamento, valorTotal, itens);
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      toast.error(error);
    }
  }
    useEffect(() => {
    if (editar && dataServico) {
      setCabelo(dataServico.cabelo || null);
      setBarba(dataServico.barba || null);
      setSobrancelha(dataServico.sobrancelha || null);
      setAdicional(dataServico.adicional || null);
      setFormaPagamento(dataServico.formaPagamento || null);
      console.log(dataServico)
    } else {

      setCabelo(null);
      setBarba(null);
      setSobrancelha(null);
      setAdicional(null);
      setFormaPagamento(null);
    }
  }, [editar, dataServico]);

  useEffect(() => {
    listarServicos();
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogDemo isModalOpen={isModalExluir} setIsModalOpen={setIsModalExcluir} />
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
            <select  value={cabelo ? JSON.stringify(cabelo) : ""} onChange={(e) => setCabelo(JSON.parse(e.target.value))} id="cabelo" className="input-base h-10">
              <option value={0}></option>
              {dataCabelos.map((item) => (
                <option key={item.id_cabelo} value={JSON.stringify(item)}>
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
            <select onChange={(e) => setBarba(JSON.parse(e.target.value))} id="barba" className="input-base h-10">
              <option value={0}></option>
              {dataBarbas.map((item) => (
                <option key={item.id_barba} value={JSON.stringify(item)}>
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
            <select onChange={(e) => setSobrancelha(JSON.parse(e.target.value))} id="sobrancelha" className="input-base h-10">
              <option value={0}></option>
              {dataSobrancelhas.map((item) => (
                <option key={item.id_sobrancelha} value={JSON.stringify(item)}>
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
            <select onChange={(e) => setAdicional(JSON.parse(e.target.value))} id="adicional" className="input-base h-10">
              <option value={0}></option>
              {dataAdicionais.map((item) => (
                <option key={item.id_adicional} value={JSON.stringify(item)}>
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
            <select onChange={(e) => setFormaPagamento(JSON.parse(e.target.value))} id="pagamento" className="input-base h-10">
              <option value={0}></option>
              {dataFormasPagamento.map((item) => (
                <option key={item.id_forma_pagamento} value={JSON.stringify(item)}>
                  {item.nome_pagamento}
                </option>
              ))}
            </select>
          </div>

          {/* Valor Total */}
          <section className="grid grid-cols-2 gap-x-2">
            <div className="flex justify-end items-center pt-6">
              <p className="text-body-bold">R$</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="valortotal" className="text-end text-body-bold">
                Valor Total
              </label>
              <input id="valortotal" value={valorTotal} readOnly type="text" className="input-base h-10 text-end pr-2 bg-gray-200 text-body-bold" />
            </div>
          </section>
        </section>

        <DialogFooter>
          <section className="flex justify-between gap-4">
            <DialogClose asChild>
              <button className="botao-base bg-text-secondary text-white w-full py-2 px-4">Cancelar</button>
            </DialogClose>
            <button onClick={handleConfimar} type="submit" className="botao-base bg-brand-primary text-white w-full py-2 px-4">
              Confirmar
            </button>
          </section>

          {editar && (
            <button type="button" className="botao-base bg-feedback-error text-white w-full py-2 px-4">
              Excluir
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
