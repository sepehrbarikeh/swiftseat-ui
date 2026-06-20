import api from "../helper/callApi";

interface Paginate {
   page?: number;
   limit?: number;
   search?: string;
   location?: string
}

export async function GetHomeConcert() {
   const res = await api.get("/");
   return res
}

export async function GetConserts(props?: Paginate) {
   const res = await api.get(`/events?page=${props?.page}+limit=${props?.limit}+search=${props?.search}+location=${props?.location}`);
   return res
}

export async function GetEventSeats(concertID: string) {
   const res = await api.get(`/events/${concertID}/seats`)
   return res
}

export async function ReservEvent(data: object) {
   const res = await api.post('/seats/reserve', data)
   return res
}

export async function ConfirmPayment(data: object) {
   const res = await api.post('/seats/confirm-payment', data)
   return res
}