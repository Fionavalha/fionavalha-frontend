import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.2.103:3000",
});

export async function listarCabelos() {
  try {
    const response = await api.get("/cabelos");
    return response;
  } catch (error) {
    console.error(error);
    return []
  }
}
