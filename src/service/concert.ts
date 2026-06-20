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
   const params = new URLSearchParams();
   if (props?.page) params.append('page', String(props.page));
   if (props?.limit) params.append('limit', String(props.limit));
   if (props?.search) params.append('search', String(props.search));
   if (props?.location) params.append('location', String(props.location));

   const queryString = params.toString();
   const url = queryString ? `/events?${queryString}` : '/events';
   const res = await api.get(url);
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