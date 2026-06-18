import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL || "https://api.fionavalha.com.br/";

export const socket = io(URL);
