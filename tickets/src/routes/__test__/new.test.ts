import request from 'supertest'
import { app } from '../../app';
import { Ticket } from '../../../models/ticket';

// To create a new objectId (for testing)
// const id = new mongoose.Types.ObjectId().toHexString();

it('has a route handler listening to /api/tickets/ for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    const title = '21313123sd';

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title,
        price: 12
    });

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(12);
    expect(tickets[0].title).toEqual(title);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets/')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets/')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
});


it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets/')
        .set('Cookie', global.signin())
        .send({
            title: 'sdajsld',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets/')
        .set('Cookie', global.signin())
        .send({
            title: 'llkajsd'
        })
        .expect(400);
});
