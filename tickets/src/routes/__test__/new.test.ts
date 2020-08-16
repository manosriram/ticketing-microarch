import request from 'supertest'
import { app } from '../../app';
import { Ticket } from '../../../models/ticket';

it('has a route handler listening to /api/tickets/ for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: '1231312as',
        price: 12
    }).expect(201);
});
