import { ArrowLeft, Plus } from "lucide-react";
import Contador from "../../components/Contador";
import Rodape from "../../components/Rodape";
import { useEffect, useState } from "react";
import { ModalServico } from "../../components/Modals/ModalServico";
import {
  alterarNumeroClientes,
  alterarStatusBarbearia,
  consultarItensServicoRealizado,
  consultarNumeroClientes,
  consultarServicosRealizados,
  consultarStatusBarbearia,
} from "../../services/api";
import CardServico from "../../components/CardServico";
import { AlertaConfirmacao } from "../../components/AlertaConfirmacao";
import { useNavigate } from "react-router";

export default function Inicio() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataServicos, setDataSevicos] = useState([]);
  const [isEditar, setIsEditar] = useState(false);
  const [dataServico, setDataServico] = useState([]);
  const [showConfirmacaoFechar, setShowConfirmacaoFechar] = useState(false);
  const [contador, setContador] = useState(0);

  async function listarServicosRealizados() {
    const agora = new Date();
    const local = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000);
    const dataFormatada = local.toISOString().split("T")[0];
    const dataServicos = await consultarServicosRealizados(dataFormatada);
    const numeroClientes = await consultarNumeroClientes();
    setDataSevicos(dataServicos);
    setContador(numeroClientes);
  }

  async function handleStatus() {
    setAberto((prev) => {
      const novoStatus = !prev;
      const statusTexto = novoStatus ? "ABERTO" : "FECHADO";
      alterarStatusBarbearia(statusTexto);
      setContador(0);
      resetarNumeroClientes();
      return novoStatus;
    });
  }

  async function resetarNumeroClientes() {
    await alterarNumeroClientes(0);
    setContador(0);
  }

  async function handleEditar(id) {
    const response = await consultarItensServicoRealizado(id);
    setDataServico(response);

    setIsEditar(true);
    setOpenModal(true);
  }

  useEffect(() => {
    if (!openModal) {
      listarServicosRealizados();
    }
  }, [openModal]);

  useEffect(() => {
    carregarStatusBarbearia();
  }, []);

  async function carregarStatusBarbearia() {
    const response = await consultarStatusBarbearia();

    if (response?.status === "ABERTO") {
      setAberto(true);
    } else {
      setAberto(false);
    }
  }

  return (
    <>
      {openModal && <ModalServico isModalOpen={openModal} setIsModalOpen={setOpenModal} editar={isEditar} dataServico={dataServico} />}
      <AlertaConfirmacao
        isModalOpen={showConfirmacaoFechar}
        setIsModalOpen={setShowConfirmacaoFechar}
        titulo="Atenção"
        descricao="Tem certeza que deseja fechar a barbearia?"
        confirmar="Confirmar"
        cancelar="Cancelar"
        onConfirm={handleStatus}
        onCancel={() => setShowConfirmacaoFechar(false)}
      />

      <div className="flex flex-col h-dvh relative mt-4">
        <div className="px-3">
          <ArrowLeft className="text-white w-10 h-10 cursor-pointer hover:text-brand-primary" onClick={() => navigate("/", { replace: true })} />
        </div>
        <section className="flex flex-col gap-y-4">
          <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 w-70 h-auto">
              <h1 className="text-center heading-1 text-white">
                Barbearia <br /> Fio Navalha
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={() => (aberto ? setShowConfirmacaoFechar(true) : handleStatus())}
                  className={`
                    flex flex-col items-center justify-center rounded-xl border text-white w-35 h-9 transition font-bold
                    ${aberto ? "bg-feedback-success cursor-pointer border-feedback-success" : "bg-feedback-error border-feedback-error"}
                  `}
                >
                  {aberto ? "Aberto" : "Fechado"}
                </button>
              </div>
            </div>
          </section>

          {aberto && (
            <div className="flex justify-center">
              <Contador contador={contador} setContador={setContador} />
            </div>
          )}
          <section className="flex flex-col gap-y-3 items-center overflow-y-auto h-113">
            {dataServicos.map((item) => (
              <CardServico
                onClick={handleEditar}
                id_servico={item.id_servico_realizado}
                key={item.id_servico_realizado}
                formaPagamento={item.forma_pagamento}
                horario={item.horario}
                nome={item.nome_servico}
                valor={item.valor_total}
              />
            ))}
          </section>
        </section>

        <div className="fixed bottom-21 right-5 z-20">
          <button
            onClick={() => {
              if (contador === 0) {
                setContador(1);
              }
              setIsEditar(false);
              setDataServico([]);
              setOpenModal(true);
            }}
          >
            <Plus className="transition text-white border border-brand-primary rounded-full bg-brand-primary cursor-pointer w-13 h-13 p-2" />
          </button>
        </div>

        <footer>
          <Rodape ativo="inicio" />
        </footer>
      </div>
    </>
  );
}
