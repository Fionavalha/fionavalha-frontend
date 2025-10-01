import { LogOut, Plus } from "lucide-react";
import { Link } from "react-router";
import Contador from "../../components/Contador";
import Rodape from "../../components/Rodape";
import { useEffect, useState } from "react";
import { ModalServico } from "../../components/Modals/ModalServico";
import { consultarItensServicoRealizado, consultarServicosRealizados } from "../../services/api";
import CardServico from "../../components/CardServico";

export default function Inicio() {
  const [aberto, setAberto] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataServicos, setDataSevicos] = useState([]);
  const [isEditar, setIsEditar] = useState(false);
  const [dataServico, setDataServico] = useState([]);

  async function listarServicosRealizados() {
    const response = await consultarServicosRealizados();
    setDataSevicos(response);
  }
  function handleStatus() {
    if (!aberto) {
      setAberto(true);
    } else {
      setAberto(false);
    }
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

  return (
    <>
      {openModal && <ModalServico isModalOpen={openModal} setIsModalOpen={setOpenModal} editar={isEditar} dataServico={dataServico} />}

      <div className="flex flex-col h-dvh relative">
        <Link to="/login" className="p-2">
          <LogOut className="text-text-secondary cursor-pointer hover:text-brand-primary w-10 h-10" />
        </Link>
        <section className="flex flex-col gap-y-5 ">
          <section className="flex flex-col items-center ">
            <div className="flex flex-col gap-y-7 w-70 h-auto  ">
              <h1 className="text-center heading-1 text-white ">
                Barbearia <br /> Fio Navalha
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={handleStatus}
                  className={`flex flex-col items-center justify-center rounded-xl border text-white w-35 h-9 transition
            ${aberto ? "bg-feedback-success cursor-pointer border-feedback-success" : "bg-feedback-error border-feedback-error"}`}
                >
                  {aberto ? "Aberto" : "Fechado"}
                </button>
              </div>
            </div>
          </section>
          <div className="flex justify-center ">
            <Contador />
          </div>

          <section className="flex flex-col gap-y-3 items-center overflow-y-auto h-113 ">
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
