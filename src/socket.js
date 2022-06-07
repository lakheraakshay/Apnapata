import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  autoConnect: false,
});

export const base_url = "http://localhost:8000/api/v1";
