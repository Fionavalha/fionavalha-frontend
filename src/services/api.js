import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.2.103:3000",
  auth: {
    username: "hP3S7l11Kg]",
    password: "3|^B2hfnI?47",
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