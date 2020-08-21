import { Subjects } from './subjects';

interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string,
        title: string,
        price: number
    }
};

export { TicketCreatedEvent };
