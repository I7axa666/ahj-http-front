export default class Fetcher {
  constructor() {
    this.url = 'https://ahj-http-back.onrender.com/';
    // this.url = 'http://localhost:3000/';
  }

  async getTicketsList() {
    const request = fetch(`${this.url}?method=allTickets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;
    return JSON.parse(await result.text());
  }

  async createTicket(body) {
    await fetch(`${this.url}?method=createTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    // const result = await request;
    // const text = await result.text();
    // console.log(text);
  }

  async deleteTicket(id) {
    await fetch(`${this.url}?id=${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const result = await request;
    // const text = await result.text();
    // console.log(text);
  }

  async getDescription(id) {
    const request = fetch(`${this.url}?method=ticketById&id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;
    const text = await result.text();
    return JSON.parse(text);
  }

  async update(body) {
    const request = fetch(`${this.url}?method=updateTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const result = await request;
    const text = await result.text();
    return text;
  }
}
