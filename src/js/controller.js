export default class Controller {
    constructor() {
        this.url = 'https://ahj-http-back.onrender.com/';
    }

    async getAllTickets() {
        const request = fetch(url+'/?method=allTickets');
        const result = await request;

        const text = await result.text();

        console.log(text);
    }
}


const url = 'https://ahj-http-back.onrender.com/';

