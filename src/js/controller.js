export default class Controller {
    constructor(list) {
        this.url = 'http://localhost:3000/';
        this.list = list;
        this.popup = null;
        this.createTicket = this.createTicket.bind(this);
    }

    init() {
        this.list.addEventListener('click', this.click);

    }

    showElement(element) {
        element.classList.toggle('hidden');
    }

    click = (event) => {
        const target = event.target;

        if (target.classList.contains('task-name')){
            this.showElement(
                target.parentElement.querySelector('.task-description')
            );
        } else if (target.classList.contains('completion-circle')) {
            target.classList.toggle('completed');
        } else if (target.classList.contains('add-job-btn')) {
            this.showPopup(true);
        } else if (target.classList.contains('ok-button')) {
            
            this.createTicket();

        } else if (target.classList.contains('cancel-button')) {
            this.showPopup();
        } 
    }

    showPopup = (action) => {
        this.popup = document.querySelector('.popup-container');

        if (action === true) {
            this.popup.classList.remove('hidden');
        } else {
            this.popup.classList.add('hidden');
        }
    }

    async createTicket() {
        const ticketName = this.popup.querySelector('#name-field').value;
        const ticketDescription = this.popup.querySelector('#description-field').value;

        const request = fetch(this.url + '?method=createTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ticketName,
                description: ticketDescription
            })

        });
        
        const result = await request;
        const text = await result.text();
        console.log(text);

        this.popup.querySelector('#name-field').value = '';
        this.popup.querySelector('#description-field').value = '';
        this.popup.classList.add('hidden');
    };
}


// const url = 'https://ahj-http-back.onrender.com/';

