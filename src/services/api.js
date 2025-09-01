import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
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
