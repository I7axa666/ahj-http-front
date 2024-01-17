import Controller from './controller';

const list = document.querySelector('.job-list');

const controllet = new Controller(list);

controllet.init();
