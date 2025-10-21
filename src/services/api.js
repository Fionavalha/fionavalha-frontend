import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.3.66:3000",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lX2JhcmJlaXJvIjoiUElOSkEiLCJpYXQiOjE3NjAwMTUzNDR9.zgm9EK0uJ5R84jgADG5fDF4gN1MSvsG_z8qcm_hkcHw`,
  },
});

export async function efetuarLogin(pNomeBarbeiro, pSenha) {
  try {
    const response = await api.post("/login", {
      nome_barbeiro: pNomeBarbeiro,
      senha: pSenha,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.erro || "Falha na comunicação com servidor";
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

export async function consultarDespesa(id) {
  try {
    let response;
    response = await api.get(`/despesas/` + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function editarDespesa(id, pNomeDespesa, pValorDespesa,pDataDespesa, pFixa) {
  try {
    await api.put("/despesas/" + id, {
      nome_despesa: pNomeDespesa,
      valor_despesa: pValorDespesa,
      data_despesa: pDataDespesa || null,
      fixa: pFixa

    });
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
      fixa: pFixa
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