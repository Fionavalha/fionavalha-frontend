import React, { useState } from "react";
import { useEffect } from "react";
import { consultarAdicionais, consultarBarbas, consultarCabelos, consultarDespesas, consultarSobrancelhas } from "../../services/api";
import CardServico from "../../components/CardServico";
import Rodape from "../../components/Rodape";
import { Button } from "@/components/ui/button";
import { Coins, LogOut, Plus } from "lucide-react";
import ModalCorte from "../../components/Modals/ModalCorte";
import ModalDespesa from "../../components/Modals/ModalDespesa";
import { replace, useNavigate } from "react-router";
import { Lock } from "lucide-react";

export default function Ajustes() {
  const [dataCabelos, setDataCabelos] = useState([]);
  const [dataBarbas, setDataBarbas] = useState([]);
  const [dataSobrancelhas, setDataSobrancelhas] = useState([]);
  const [dataAdicionais, setDataAdicionais] = useState([]);
  const [dataDespesas, setDataDespesas] = useState([]);
  const [isModalCorte, setIsModalCorte] = useState(false);
  const [isModalDespesa, setIsModalDespesa] = useState(false);
  const [isEditar, setIsEditar] = useState(false);
  const navigate = useNavigate();

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

  async function listarDespesas() {
    const response = await consultarDespesas();
    setDataDespesas(response);
  }

  async function handleSubmitCorte(e) {
    e.preventDefault();
  }

  async function handleSubmitDespesa(e) {
    e.preventDefault();
  }

  useEffect(() => {
    listarCabelos();
    listarBarbas();
    listarSobrancelhas();
    listarAdicionais();
    listarDespesas();
  }, []);

  return (
    <>
      <ModalCorte isOpen={isModalCorte} setIsOpen={setIsModalCorte} editar={isEditar} onClick={handleSubmitCorte} />
      <ModalDespesa isOpen={isModalDespesa} setIsOpen={setIsModalDespesa} editar={isEditar} onClick={handleSubmitDespesa} />
      <section className="flex flex-col mt-2 items-center gap-y-5 min-h-screen">
        <h2 className="text-white heading-2">Serviços</h2>
        <section className="flex flex-col gap-y-4 w-full items-center">
          {dataCabelos?.map((item) => (
            <CardServico key={item?.id_cabelo} nome={item?.nome_cabelo} valor={item?.valor_cabelo} />
          ))}

          {dataBarbas?.map((item) => (
            <CardServico key={item?.id_barba} nome={item?.nome_barba} valor={item?.valor_barba} />
          ))}

          {dataSobrancelhas?.map((item) => (
            <CardServico key={item?.id_sobrancelha} nome={item?.nome_sobrancelha} valor={item?.valor_sobrancelha} />
          ))}

          {dataAdicionais?.map((item) => (
            <CardServico key={item?.id_adicional} nome={item?.nome_adicional} valor={item?.valor_adicional} />
          ))}
        </section>
        <h2 className="text-white heading-2">Despesas</h2>
        <section className="flex flex-col gap-4 w-full items-center">
          {dataDespesas?.despesas?.map((item) => (
            <CardServico tipo="despesa" nome={item?.nome_despesa} valor={item?.valor_despesa} />
          ))}
        </section>
        <h2 className="text-white heading-2">Configurações</h2>
        <section className="flex items-center flex-col w-full gap-4">
          <Button onClick={() => navigate("/alterar-senha")} variant="outline" className="w-9/10 max-w-90">
            <Coins />
            Alterar Val. Adicionais Pagamento
          </Button>
          <Button onClick={() => navigate("/alterar-senha")} variant="outline" className="w-9/10 max-w-90">
            <Lock />
            Alterar Senha
          </Button>
          <Button onClick={() => navigate("/login", replace)} variant="outline" className="w-9/10 max-w-90">
            <LogOut />
            Sair
          </Button>
        </section>
        <section className="flex w-full justify-end">
          <div className="flex gap-4 h-20">
            <Button onClick={() => setIsModalDespesa(true)} variant="destructive" className="fixed bottom-11 right-30">
              <Plus /> Despesa
            </Button>
            <Button onClick={() => setIsModalCorte(true)} className="fixed bottom-11 right-2">
              <Plus /> Serviço
            </Button>
          </div>
        </section>
      </section>
      <section>
        <Rodape ativo="ajustes" />
      </section>
    </>
  );
}
