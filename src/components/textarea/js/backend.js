'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';
  var SUCCES_CODE = 200;
  var TIMEOUT_TIME = 10000;

  window.backend = {};

  window.backend.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCES_CODE) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend.send = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCES_CODE) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open('POST', SEND_URL);
    xhr.send(data);
  };

})();
