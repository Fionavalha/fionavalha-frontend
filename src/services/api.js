import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.2.102:3000",
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
    localStorage.setItem("id_barbeiro", response.data.id_barbeiro);
    localStorage.setItem("nome_barbeiro", response.data.nome_barbeiro);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.erro || "Falha na comunicação com servidor";
  }
}

export async function alterarSenha(pIdBarbeiro, pSenhaAntiga, pSenhaNova) {
  try {
    const response = await api.post("/alterar-senha", {
      id_barbeiro: pIdBarbeiro,
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

export async function consultarBarbas() {
  try {
    const response = await api.get("/barbas");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
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

export async function consultarAdicionais() {
  try {
    const response = await api.get("/adicionais");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
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

export async function adicionarServicoRealizado(pFormaPagamentoId, pValorTotal, pItemId) {
  try {
    await api.post("/servicos-realizados", {
      forma_pagamento_id: pFormaPagamentoId,
      valor_total: pValorTotal,
      itens: pItemId,
    });
  } catch (error) {
    console.error(error);
    throw error.response?.data?.erro || "Falha ao confimar o serviço";
  }
}
export async function consultarServicosRealizados() {
  try {
    const response = await api.get("/servicos-realizados");
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

export async function excluirServicoRealizado(id) {
  try {
    await api.delete("/servicos-realizados/" + id);
  } catch (error) {
    console.error(error);
  }
}

export async function editarServicoRealizado(id, pFormaPagamentoId, pValorTotal, pItemId) {
  try {
    await api.put("/servicos-realizados/" + id, {
      forma_pagamento_id: pFormaPagamentoId,
      valor_total: pValorTotal,
      itens: pItemId,
    });
  } catch (error) {
    console.error(error);
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

export async function alterarNumeroClientes(id_barbeiro, numero_clientes) {
  try {
    await api.put(`/barbearias/numero-clientes/${id_barbeiro}`, {
      numero_clientes,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function consultarNumeroClientes() {
  try {
    const response = await api.get(`/barbearias/numero-clientes/1`);
    return response.data.numero_clientes;
  } catch (error) {
    console.error(error);
  }
}

export async function consultarStatusBarbearia() {
  try {
    const response = await api.get(`/barbearias/status/1`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function alterarStatusBarbearia(id_barbeiro, status) {
  try {
    await api.put(`/barbearias/status/${id_barbeiro}`, {
      status,
    });
  } catch (error) {
    console.error(error);
  }
}
