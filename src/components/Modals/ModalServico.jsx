import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { consultarAdicionais, consultarBarbas, consultarCabelos, consultarFormasPagamento, consultarSobrancelhas } from "../../services/api";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "../Alert";

export function ModalServico({ editar, isModalOpen, setIsModalOpen }) {
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
    (cabelo?.valor_cabelo || 0) +
    (barba?.valor_barba || 0) +
    (sobrancelha?.valor_sobrancelha || 0) +
    (adicional?.valor_adicional || 0) +
    (adicionalCartao || 0);

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

  function handleExcluir() {
    setIsModalExcluir(true);
  }

  useEffect(() => {
    listarServicos();
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogDemo isModalOpen={isModalExluir} setIsModalOpen={setIsModalExcluir} />
      <form>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="heading-2 text-center">{editar ? "Editar Serviço" : "Adicionar Serviço"}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <section className="flex flex-col gap-y-2 py-2">
            <div className="flex flex-col">
              <label htmlFor="cabelo" className="text-body-bold">
                Cabelo
              </label>
              <select onChange={(e) => setCabelo(JSON.parse(e.target.value))} id="cabelo" className="input-base h-10">
                <option value={0}></option>
                {dataCabelos.map((item) => (
                  <option key={item.id_cabelo} value={JSON.stringify(item)}>
                    {item.nome_cabelo} (R$ {item.valor_cabelo})
                  </option>
                ))}
              </select>
            </div>
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
            <section className="grid grid-cols-2 gap-x-2">
              <div className="flex justify-end items-center pt-6">
                <p className="text-body-bold">R$</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="valortotal" className="text-end text-body-bold">
                  Valor Total
                </label>
                <input value={valorTotal} readOnly type="text" className="input-base h-10 text-end pr-2 bg-gray-200 text-body-bold" />
              </div>
            </section>
          </section>
          <DialogFooter>
            <section className="flex justify-between gap-4">
              <DialogClose asChild>
                <button className="botao-base bg-text-secondary text-white w-full py-2 px-4">Cancelar</button>
              </DialogClose>
              <button type="submit" className="botao-base bg-brand-primary text-white w-full py-2 px-4">
                Confirmar
              </button>
            </section>
            {editar && (
              <button onClick={handleExcluir} type="button" className="botao-base bg-feedback-error text-white w-full py-2 px-4">
                Excluir
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
