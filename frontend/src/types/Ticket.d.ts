interface ITicket {
    _id?: string;
    name?: string;
    description?: string;
    events?: string;
    price?: string | number;
    quantity?: string | number;
}

export type { ITicket };
