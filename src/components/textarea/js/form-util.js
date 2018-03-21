'use strict';

(function () {
  window.formUtil = {};

  window.formUtil.highlightInvalidInput = function (input) {
    input.classList.add('invalid-value-input');
  };

  window.formUtil.resetInvalidHighlightingInput = function (input) {
    input.classList.remove('invalid-value-input');
  };

  window.formUtil.resetAllInvalidHighlighting = function () {
    var invalidInputs = document.querySelectorAll('.invalid-value-input');
    invalidInputs.forEach(function (element) {
      window.formUtil.resetInvalidHighlightingInput(element);
    });
  };

  window.formUtil.setDisabledByValue = function (elements, values) {
    elements.forEach(function (element) {
      element.disabled = false;
      if (values.indexOf(element.value) > -1) {
        element.disabled = true;
      }
    });
  };

  window.formUtil.setAdress = function (x, y) {
    var adressInputElement = document.querySelector('#address');
    adressInputElement.value = Math.round(x) + ', ' + Math.round(y);
  };
})();
