'use strict';

(function () {
  var errorPanelElement = document.querySelector('.error-panel');
  var errorTextElement = errorPanelElement.querySelector('.error-panel__text');
  var errorCloseElement = errorPanelElement.querySelector('.error-panel__close-btn');

  window.errorHandler = {};

  window.errorHandler.delete = function () {
    errorPanelElement.classList.remove('error-panel_active');
  };

  window.errorHandler.show = function (errorText) {
    errorPanelElement.classList.add('error-panel_active');
    errorTextElement.textContent = errorText;
  };

  errorCloseElement.addEventListener('click', window.errorHandler.delete);
})();
