import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.2.107:3000",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiUElOSkEiLCJpYXQiOjE3NTIwMTQ1NzZ9.pKsnAOryYtMJqLDul6D3bbHF2xsnNjM49GByu4C9D04`,
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

export async function adicionarServicoRealizado(pFormaPagamentoId, pValorTotal, pItemId,) {
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

export async function consultarServicoRealizado(id) {
  try {
    const response = await api.get("/servicos-realizados/"+id);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

