import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

function fetchCountries(searchQuery) {
  let url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url)
    .then(response => response.json())
    .then(resp => {
      if (resp.status !== undefined) {
        throw Error(`is not ok: ` + resp.status);
      }
      return resp;
    });
}

export default fetchCountries;
