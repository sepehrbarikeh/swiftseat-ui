
export interface CreateEventType {
    title: string;
    description: string;
    location: string;
    start_time: string;
    rows: number;
    seats_per_row: number;
    image : File;
}

export interface UpdateEventType {
    title: string;
    description: string;
    location: string;
    image : File;
}