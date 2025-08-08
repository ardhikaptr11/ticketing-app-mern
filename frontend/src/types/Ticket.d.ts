interface ITicket {
    _id?: string;
    name?: string;
    description?: string;
    events?: string;
    price?: string | number;
    quantity?: string | number;
}

interface ICart {
    event: string;
    ticket: string;
    quantity: number;
}

export type { ICart, ITicket };
