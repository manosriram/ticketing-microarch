import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent }  from "./ticket-created-event";
import { Subjects } from "./subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payments-service";

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event Data!', data);

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);

        msg.ack(); // Acknowledge the message.
    }

};

export { TicketCreatedListener };
