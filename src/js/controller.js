import TicketCard from './Ticket';
import Fetcher from './fetch';

export default class Controller {
  constructor(list) {
    this.list = list;
    this.popup = null;
    this.ul = list.querySelector('ul');
    this.createTicket = this.createTicket.bind(this);
    this.restart = this.restart.bind(this);
    this.init = this.init.bind(this);
    this.id = null;
    this.ticketName = null;
    this.description = null;
    this.status = null;

    this.fetcher = new Fetcher();
  }

  init() {
    this.list.addEventListener('click', this.click);

    this.restart();
  }

  async restart() {
    this.ul.innerHTML = '';

    const ticketList = await this.fetcher.getTicketsList();

    ticketList.forEach((element) => {
      this.ul.appendChild(TicketCard.createTicket(element));
    });
  }

  async showElement(element) {
    if (element.parentElement.querySelector('.task-description')) {
      element.parentElement.querySelector('.task-description').remove();
    } else {
      const id = element.closest('.job-item').getAttribute('ticketID');
      const description = await this.fetcher.getDescription(id);
      const div = document.createElement('div');
      div.classList.add('task-description');
      const p = document.createElement('p');
      p.textContent = description[0].description;
      div.appendChild(p);
      element.parentElement.appendChild(div);
    }
  }

  click = async (event) => {
    const { target } = event;

    if (target.classList.contains('task-name')) {
      this.showElement(target);
    } else if (target.classList.contains('completion-circle')) {
      if (target.classList.contains('completed')) {
        this.status = false;
      } else {
        this.status = true;
      }
      target.classList.toggle('completed');

      const id = target.parentElement.getAttribute('ticketId');
      const description = await this.fetcher.getDescription(id);

      this.createTicket(
        id,
        target.parentElement.querySelector('.task-name').textContent,
        description[0].description,
        this.status,
      );
    } else if (target.classList.contains('add-job-btn')) {
      this.showPopup('add-ticket');
    } else if (target.classList.contains('ok-button')) {
      if (target.classList.contains('change-btn')) {
        this.createTicket(
          this.id,
          this.popup.querySelector('#name-field-').value,
          this.popup.querySelector('#description-field-').value,
        );
      } else if (target.classList.contains('confirmation-btn')) {
        this.popup.classList.toggle('hidden');
        this.popup.classList.toggle('show');
        this.popup = null;
        this.deleteTicket(this.id);
      } else {
        this.createTicket();
      }
    } else if (target.classList.contains('cancel-button')) {
      this.showPopup('show');
    } else if (target.classList.contains('delete-btn')) {
      this.id = target.parentElement.getAttribute('ticketId');
      this.showPopup('delete-ticket');
    } else if (target.classList.contains('edit-btn')) {
      this.showPopup('change-ticket');
      this.showInfoForChange(target.closest('.job-item'));
    }
  };

  showPopup = (someClass) => {
    this.popup = document.querySelector(`.${someClass}`);

    this.popup.classList.toggle('show');
    this.popup.classList.toggle('hidden');
  };

  async createTicket(id, name, description, status = false) {
    if (id) {
      const body = {
        id,
        name,
        description,
        status,
        created: Controller.getCurrentDate(),
      };

      await this.fetcher.update(JSON.stringify(body));

      if (this.popup) {
        this.popup.querySelector('#name-field-').value = '';
        this.popup.querySelector('#description-field-').value = '';
        this.popup.classList.toggle('hidden');
        this.popup.classList.toggle('show');
        this.popup = null;
      }
      window.location.reload();
      // this.restart();
    } else {
      const ticketName = this.popup.querySelector('#name-field').value;
      const ticketDescription = this.popup.querySelector('#description-field').value;

      const body = JSON.stringify({
        name: ticketName,
        description: ticketDescription,
      });

      await this.fetcher.createTicket(body);

      this.popup.querySelector('#name-field').value = '';
      this.popup.querySelector('#description-field').value = '';
      this.popup.classList.toggle('hidden');
      this.popup.classList.toggle('show');
      this.popup = null;
      window.location.reload();
    }
  }

  async deleteTicket(id) {
    await this.fetcher.deleteTicket(id);
    // window.location.reload();
    this.restart();
  }

  async showInfoForChange(element) {
    const name = element.querySelector('H3').textContent;
    this.id = element.getAttribute('ticketId');
    const description = await this.fetcher.getDescription(this.id);
    this.popup.querySelector('#name-field-').value = name;
    this.popup.querySelector('#description-field-').value = description[0].description;
  }

  static getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
