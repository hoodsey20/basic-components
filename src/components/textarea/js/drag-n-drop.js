'use strict';

(function () {
  var dropZoneElements = document.querySelectorAll('.drop-zone');

  var dragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var removeDragData = function (evt) {
    evt.dataTransfer.clearData();
  };

  var dropHandler = function (evt) {
    evt.preventDefault();
    var inputElement = document.getElementById(evt.target.htmlFor);
    inputElement.files = evt.dataTransfer.files;

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      var changeEvent = new Event('change');
      inputElement.dispatchEvent(changeEvent);
    }

    removeDragData(evt);
  };

  dropZoneElements.forEach(function (element) {
    element.addEventListener('dragover', dragOverHandler);
    element.addEventListener('drop', dropHandler);
  });

})();
