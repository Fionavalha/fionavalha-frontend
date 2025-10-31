import React, { useState } from "react";
import { useEffect } from "react";
import { consultarAdicionais, consultarAdicional, consultarBarbas, consultarCabelos, consultarDespesa, consultarDespesas, consultarHorario, consultarSobrancelhas } from "../../services/api";
import CardServico from "../../components/CardServico";
import Rodape from "../../components/Rodape";
import { Button } from "@/components/ui/button";
import { CalendarClock, Coins, LogOut, Plus } from "lucide-react";
import ModalDespesa from "../../components/Modals/ModalDespesa";
import { replace, useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { formatarDataPtBr } from "../../utils/formatador";
import ModalServicoPersonalizado from "../../components/Modals/ModalServicoPersonalizado";
import ModalAlterarHorario from "../../components/Modals/ModalAlterarHorario";
import ModalAdicionalPagamento from "../../components/Modals/ModalAdicionalPagamento.jsx";

export default function Ajustes() {
  const [dataCabelos, setDataCabelos] = useState([]);
  const [dataBarbas, setDataBarbas] = useState([]);
  const [dataSobrancelhas, setDataSobrancelhas] = useState([]);
  const [dataAdicionais, setDataAdicionais] = useState([]);
  const [dataDespesas, setDataDespesas] = useState([]);
  const [dataAdicional, setDataAdicional] = useState([]);
  const [dataHorario, setDataHorario] = useState([]);
  const [dataServico, setDataServico] = useState([]);
  const [dataServicoPersonalizado, setDataServicoPersonalizado] = useState([]);

  const [isModalDespesa, setIsModalDespesa] = useState(false);
  const [isModalServico, setIsModalServico] = useState(false);
  const [isModalHorario, setIsModalHorario] = useState(false);
  const [isModalAdicional, setIsModalAdicional] = useState(false);

  const [isEditarDespesa, setIsEditarDespesa] = useState(false);
  const [isEditarHorario, setIsEditarHorario] = useState(false);
  const [isEditarAdicionalPagamento, setIsEditarAdicionalPagamento] = useState(false);
  const [isEditarServicoPersonalizado, setIsEditarServicoPersonalizado] = useState(false);

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
  async function handleEditar(id) {
    const response = await consultarDespesa(id);
    setDataServico(response);
    setIsEditarDespesa(true);
    setIsModalDespesa(true);
  }

  async function handleServicoCabelo(servico) {
    setDataServicoPersonalizado({ ...servico, tipo: "cabelo" });
    setIsEditarServicoPersonalizado(true);
    setIsModalServico(true);
  }

  async function handleServicoBarba(servico) {
    setDataServicoPersonalizado({ ...servico, tipo: "barba" });
    setIsEditarServicoPersonalizado(true);
    setIsModalServico(true);
  }

  async function handleServicoSobrancelha(servico) {
    setDataServicoPersonalizado({ ...servico, tipo: "sobrancelha" });
    setIsEditarServicoPersonalizado(true);
    setIsModalServico(true);
  }

  async function handleServicoAdicionais(servico) {
    setDataServicoPersonalizado({ ...servico, tipo: "adicionais" });
    setIsEditarServicoPersonalizado(true);
    setIsModalServico(true);
  }

  async function handleHorario() {
    const response = await consultarHorario();
    setDataHorario(response);
    setIsEditarHorario(true);
    setIsModalHorario(true);
  }

  async function handleAdicional() {
    const response = await consultarAdicional();
    setDataAdicional(response);
    setIsEditarAdicionalPagamento(true);
    setIsModalAdicional(true);
  }

  useEffect(() => {
    if (isModalDespesa) return;
    listarDespesas();
  }, [isModalDespesa]);

  useEffect(() => {
    if (isModalServico) return;
    listarCabelos();
    listarBarbas();
    listarSobrancelhas();
    listarAdicionais();
  }, [isModalServico]);

  return (
    <>
      <ModalDespesa isOpen={isModalDespesa} setIsOpen={setIsModalDespesa} editar={isEditarDespesa} dataServico={dataServico} />
      <ModalServicoPersonalizado isOpen={isModalServico} setIsOpen={setIsModalServico} editar={isEditarServicoPersonalizado} data={dataServicoPersonalizado} />
      <ModalAlterarHorario isOpen={isModalHorario} setIsOpen={setIsModalHorario} editar={isEditarHorario} dateHorario={dataHorario} />
      <ModalAdicionalPagamento isOpen={isModalAdicional} setIsOpen={setIsModalAdicional} editar={isEditarAdicionalPagamento} dateAdicional={dataAdicional} />

      <section className="flex flex-col mt-2 items-center gap-y-5 min-h-screen">
        <h2 className="text-white heading-2">Serviços</h2>
        <section className="flex flex-col gap-y-4 w-full items-center">
          {dataCabelos?.map((item) => (
            <CardServico key={item?.id_cabelo} onClick={() => handleServicoCabelo(item)} nome={item?.nome_cabelo} valor={item?.valor_cabelo} />
          ))}

          {dataBarbas?.map((item) => (
            <CardServico key={item?.id_barba} onClick={() => handleServicoBarba(item)} nome={item?.nome_barba} valor={item?.valor_barba} />
          ))}

          {dataSobrancelhas?.map((item) => (
            <CardServico key={item?.id_sobrancelha} onClick={() => handleServicoSobrancelha(item)} nome={item?.nome_sobrancelha} valor={item?.valor_sobrancelha} />
          ))}

          {dataAdicionais?.map((item) => (
            <CardServico key={item?.id_adicional} onClick={() => handleServicoAdicionais(item)} nome={item?.nome_adicional} valor={item?.valor_adicional} />
          ))}
        </section>
        <h2 className="text-white heading-2">Despesas</h2>
        <section className="flex flex-col gap-4 w-full items-center">
          {dataDespesas?.despesas?.map((item) => (
            <CardServico
              id_servico={item.id_despesa}
              key={item.id_despesa}
              horario={formatarDataPtBr(item.data_despesa)}
              onClick={handleEditar}
              tipo="despesa"
              nome={item?.nome_despesa}
              valor={item?.valor_despesa}
            />
          ))}
        </section>
        <h2 className="text-white heading-2">Configurações</h2>
        <section className="flex items-center flex-col w-full gap-4">
          <Button onClick={handleHorario} variant="outline" className="w-9/10 max-w-90">
            <CalendarClock />
            Alterar Horário de Funcionamento
          </Button>
          <Button onClick={handleAdicional} variant="outline" className="w-9/10 max-w-90">
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
          <div className="h-20">
            <Button
              onClick={() => {
                setIsEditarDespesa(false);
                setIsModalDespesa([]);
              }}
              variant="destructive"
              className="fixed bottom-11 right-1"
            >
              <Plus /> Despesa
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
