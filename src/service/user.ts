import api from "../helper/callApi";
import { LoginType, RegisterType } from "../types/user";

export async function RegisterHandler(data: RegisterType) {
    const res = await api.post("/register", data);
    return res
}

export async function LoginHandler(data: LoginType) {
    const res = await api.post("/login", data);
    return res
}

export async function MyTickets() {
     const res = await api.get("/user/tickets");
    return res
}