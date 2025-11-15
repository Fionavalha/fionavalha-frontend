import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.fionavalha.com.br/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function efetuarLogin(pNomeBarbeiro, pSenha) {
  try {
    const response = await api.post("/login", {
      nome_barbeiro: pNomeBarbeiro,
      senha: pSenha,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("nome_barbeiro", response.data.nome_barbeiro);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.erro || "Falha na comunicação com servidor";
  }
}

export async function alterarSenha(pSenhaAntiga, pSenhaNova) {
  try {
    const response = await api.post("/alterar-senha", {
      senha_antiga: pSenhaAntiga,
      senha_nova: pSenhaNova,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.mensagem || "Falha na comunicação com o servidor";
  }
}

export async function consultarCabelos() {
  try {
    const response = await api.get("/cabelos");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function editarCabelo(id, pNome, pValor) {
  try {
    await api.put("/cabelos/" + id, {
      nome_cabelo: pNome,
      valor_cabelo: pValor,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarBarbas() {
  try {
    const response = await api.get("/barbas");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function editarBarba(id, pNome, pValor) {
  try {
    await api.put("/barbas/" + id, {
      nome_barba: pNome,
      valor_barba: pValor,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarSobrancelhas() {
  try {
    const response = await api.get("/sobrancelhas");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function editarSobrancelha(id, pNome, pValor) {
  try {
    await api.put("/sobrancelhas/" + id, {
      nome_sobrancelha: pNome,
      valor_barba: pValor,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarAdicionais() {
  try {
    const response = await api.get("/adicionais");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function editarAdicionais(id, pNome, pValor) {
  try {
    await api.put("/adicionais/" + id, {
      nome_adicional: pNome,
      valor_adicional: pValor,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarFormasPagamento() {
  try {
    const response = await api.get("/formas-pagamento");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function adicionarServicoRealizado(dadosServico) {
  try {
    await api.post("/servicos-realizados", dadosServico);
  } catch (error) {
    console.error("Erro em adicionarServicoRealizado:", error.response?.data || error.message);
    throw new Error(error.response?.data?.erro || "Falha ao confimar o serviço");
  }
}

export async function consultarServicosRealizados(data = "") {
  try {
    const response = await api.get(`/servicos-realizados?data=${data}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function consultarItensServicoRealizado(id) {
  try {
    const response = await api.get("/servicos-realizados/itens/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function excluirServicoRealizado(id_servico_realizado) {
  try {
    await api.delete("/servicos-realizados/" + id_servico_realizado);
  } catch (error) {
    console.error(error);
  }
}

export async function editarServicoRealizado(id_servico_realizado, dadosServico) {
  try {
    await api.put(`/servicos-realizados/${id_servico_realizado}`, dadosServico);
  } catch (error) {
    console.error("Erro em editarServicoRealizado:", error.response?.data || error.message);
    throw new Error(error.response?.data?.erro || "Falha ao editar o serviço");
  }
}

export async function consultarReceitas(dataInicial, dataFinal) {
  try {
    const response = await api.get(`/receitas?data_inicial=${dataInicial}&data_final=${dataFinal}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function consultarDespesas(dataInicial = "", dataFinal = "") {
  try {
    let response;
    if (dataInicial !== "" && dataFinal !== "") {
      response = await api.get(`/despesas?data_inicial=${dataInicial}&data_final=${dataFinal}`);
    } else {
      response = await api.get(`/despesas`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function consultarDespesa(id) {
  try {
    let response;
    response = await api.get(`/despesas/` + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function alterarNumeroClientes(numero_clientes) {
  try {
    await api.put(`/barbearias/numero-clientes`, {
      numero_clientes,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function editarDespesa(id, pNomeDespesa, pValorDespesa, pDataDespesa, pFixa) {
  try {
    await api.put("/despesas/" + id, {
      nome_despesa: pNomeDespesa,
      valor_despesa: pValorDespesa,
      data_despesa: pDataDespesa || null,
      fixa: pFixa,
    });
  } catch (error) {
    console.error(error);
  }
}
export async function consultarBarbearias() {
  try {
    const response = await api.get(`/barbearias`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function consultarNumeroClientes() {
  try {
    const response = await api.get(`/barbearias/numero-clientes`);
    return response.data.numero_clientes;
  } catch (error) {
    console.error(error);
  }
}

export async function adicionarDespesaRealizada(pNomeDespesa, pValorDespesa, pDataDespesa, pFixa) {
  try {
    await api.post("/despesas", {
      nome_despesa: pNomeDespesa,
      valor_despesa: Number(pValorDespesa),
      data_despesa: pDataDespesa || null,
      fixa: pFixa,
    });
  } catch (error) {
    console.error(error);
    throw error.response?.data?.erro || "Falha ao confirmar o serviço";
  }
}

export async function excluirDespesaRealizada(id) {
  try {
    await api.delete("/despesas/" + id);
  } catch (error) {
    console.error(error);
  }
}
export async function consultarStatusBarbearia() {
  try {
    const response = await api.get(`/barbearias/status`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function alterarStatusBarbearia(status) {
  try {
    await api.put(`/barbearias/status`, {
      status,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarHorario() {
  try {
    let response;
    response = await api.get(`/barbearias/horario`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function editarHora(pHorario_inicio, pHorario_fim) {
  try {
    await api.put(`/barbearias/horario`, {
      horario_inicio: pHorario_inicio,
      horario_fim: pHorario_fim,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarAdicional() {
  try {
    let response;
    response = await api.get(`/barbearias/adicional-forma-pagamento`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function editarAdicional(pAdicionalFormaPagamento) {
  try {
    await api.put(`/barbearias/adicional-forma-pagamento`, {
      adicional_forma_pagamento: pAdicionalFormaPagamento,
    });
  } catch (error) {
    console.error(error);
  }
}
