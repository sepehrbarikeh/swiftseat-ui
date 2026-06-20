import api from "../helper/callApi";
import type { AxiosResponse } from 'axios';



export async function CheckTicket(ref: string): Promise<AxiosResponse<{ data: unknown }>> {
    const res = await api.get(`/tickets/validate/${ref}`)
    return res as AxiosResponse<{ data: unknown }>;
}

export async function AdminGetEvents(props?: { page?: number; limit?: number }): Promise<AxiosResponse<{ data: import("@/src/types/concert").Events }>> {
    const params = new URLSearchParams();
    if (props?.page) params.append("page", String(props.page));
    if (props?.limit) params.append("limit", String(props.limit));

    const url = params.toString() ? `/events/all?${params.toString()}` : "/events/all";
    const res = await api.get(url);
    return res as AxiosResponse<{ data: import("@/src/types/concert").Events }>;
}

export async function CreateEvent(data: FormData): Promise<AxiosResponse<unknown>> {
    // Let the browser/axios set the Content-Type and boundary for multipart requests
    const res = await api.post("/events", data);
    return res as AxiosResponse<unknown>;
}

export async function UpdateEvent(id: string, data: FormData): Promise<AxiosResponse<unknown>> {
    const res = await api.put(`/events/${id}`, data);
    return res as AxiosResponse<unknown>;
}

export async function DeleteEvent(id: string): Promise<AxiosResponse<unknown>> {
    const res = await api.delete(`/events/${id}`);
    return res as AxiosResponse<unknown>;
}


export async function ChangeUserRole(id: string,data : {role: string}): Promise<AxiosResponse<unknown>> {
    const res = await api.post(`/users/${id}/role`,data);
    return res as AxiosResponse<unknown>;
}
