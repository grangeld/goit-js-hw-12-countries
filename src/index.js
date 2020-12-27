import './scss/main.scss';
import contryNamesTpl from './templates/contrys.hbs';
import contryNameTpl from './templates/contry.hbs';
import featchArticles from './js/fetchCountries';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const input = document.querySelector('.contryName');
const ul = document.querySelector('.js-infoContrys');
const contryInfo = document.querySelector('.contryInfo');

const enteringTextToSearch = debounce(() => {
  featchArticles(input.value)
    .then(resp => {
      addList(resp);
    })
    .catch(errors => {
      console.error(errors);
      ul.innerHTML = '';
      contryInfo.innerHTML = '';
      error({
        title: 'Warning!',
        text: errors,
        delay: 2000,
        closerHover: true,
      });
    });
}, 500);

input.addEventListener('input', enteringTextToSearch);

function addList(arr) {
  console.log(arr);
  if (arr.length >= 10) {
    error({
      title: 'Warning!',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
      closerHover: true,
    });
    ul.innerHTML = '';
    contryInfo.innerHTML = '';
    return;
  }
  if (arr.length === 1) {
    ul.innerHTML = '';
    contryInfo.innerHTML = contryNameTpl(...arr);
  } else {
    contryInfo.innerHTML = '';
    ul.innerHTML = contryNamesTpl(arr);
  }
}
