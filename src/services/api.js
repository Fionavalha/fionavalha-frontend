import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.3.66:3000",
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

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function listarCabelos() {
  try {
    const response = await api.get("/cabelos");
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
