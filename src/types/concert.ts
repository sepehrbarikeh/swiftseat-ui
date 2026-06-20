
export interface Concert {
    id: number;
    title: string;
    description: string;
    location: string;
    start_time: string;
    ImageUrl: string;
    available_seats: number;
    total_seats: 150;
}

export interface HomeConcert {
    popular: Concert[];
    upcoming: Concert[];
}


export interface Events {
    total_items: number,
    total_pages: number,
    current_page: number,
    limit: number,
    events: Concert[]
}

export interface Seats {
    seat_id: number,
    seat_number: string,
    row_name: string,
    price: number,
    status: string
}