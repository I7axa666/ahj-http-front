export default class TicketCard {
  static createTicket(ticketInfo) {
    const { id } = ticketInfo;
    const { name } = ticketInfo;
    const { status } = ticketInfo;
    const date = ticketInfo.created;

    const divJobIitem = document.createElement('li');
    divJobIitem.classList.add('job-item');
    divJobIitem.setAttribute('ticketId', id);

    const divCompletionCircle = document.createElement('div');
    divCompletionCircle.classList.add('completion-circle');
    if (status) {
      divCompletionCircle.classList.add('completed');
    }
    const divTaskName = document.createElement('div');
    divTaskName.classList.add('task-name');
    const h3TaskName = document.createElement('H3');
    h3TaskName.classList.add('task-name');
    h3TaskName.textContent = name;

    divTaskName.appendChild(h3TaskName);

    const divCreationTime = document.createElement('div');
    divCreationTime.classList.add('creation-time');
    divCreationTime.textContent = date;

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit-btn');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete-btn');

    divJobIitem.appendChild(divCompletionCircle);
    divJobIitem.appendChild(divTaskName);
    divJobIitem.appendChild(divCreationTime);
    divJobIitem.appendChild(btnEdit);
    divJobIitem.appendChild(btnDelete);

    return divJobIitem;
  }
}
