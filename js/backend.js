'use strict';

(function () {
  var Url = {
    SAVE: 'https://js.dump.academy/kekstagram1',
    LOAD: 'https://js.dump.academy/kekstagram/data'
  };
  var TIMEOUT_VALUE = 10000;

  function loadDataFromServer(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_VALUE;
    xhr.open('GET', Url.LOAD);
    xhr.send();
  }

  function saveFormDataToServer(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_VALUE;
    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  }

  window.backend = {
    load: loadDataFromServer,
    save: saveFormDataToServer
  };
})();
