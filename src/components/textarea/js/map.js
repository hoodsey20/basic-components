'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_PEAK_HEIGHT = 16;
  var PIN_PEAK_Y_CORRECTION = Math.round(MAIN_PIN_HEIGHT / 2 + MAIN_PIN_PEAK_HEIGHT);

  var MAIN_PIN_Y_LIMITS = {
    min: 150,
    max: 500,
  };

  var formElement = document.querySelector('.notice__form');
  var cityMap = document.querySelector('.map');
  var mapWidth = cityMap.offsetWidth;
  var mainPinElement = document.querySelector('.map__pin--main');

  var initialCoords = {
    x: mainPinElement.offsetLeft,
    y: mainPinElement.offsetTop,
  };

  var pinCoordinates = Object.create(initialCoords);
  var formBtnElement = document.querySelector('.notice__form');

  var renderInitially = function (offers) {
    window.offers = offers;
    window.mapPins.render(offers);
  };


  var mouseDownHandler = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function (evt) {
    evt.preventDefault();
    var x = evt.pageX - cityMap.offsetLeft;
    var y = evt.pageY - cityMap.offsetTop;
    var pinYPeak = y + PIN_PEAK_Y_CORRECTION;

    if (pinYPeak >= MAIN_PIN_Y_LIMITS.min && pinYPeak <= MAIN_PIN_Y_LIMITS.max) {
      pinCoordinates.y = y;
    }

    if (x >= 0 && x <= mapWidth) {
      pinCoordinates.x = x;
    }

    mainPinElement.style.top = pinCoordinates.y + 'px';
    mainPinElement.style.left = pinCoordinates.x + 'px';

    window.formUtil.setAdress(pinCoordinates.x, pinCoordinates.y + PIN_PEAK_Y_CORRECTION);
  };

  var mouseUpHandler = function (evt) {
    evt.preventDefault();
    if (document.querySelectorAll('.map__pin').length < 2) {
      window.errorHandler.delete();
      window.backend.load(renderInitially, window.errorHandler.show);
    }
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  var setInitialMapPinState = function () {
    mainPinElement.style.top = initialCoords.y + 'px';
    mainPinElement.style.left = initialCoords.x + 'px';
    setTimeout(function () {
      window.formUtil.setAdress(initialCoords.x, initialCoords.y + PIN_PEAK_Y_CORRECTION);
    }, 0);
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !formElement.contains(evt.target)) {
      window.offerCard.remove();
    }
  };

  window.appState.unsetActive();
  window.formUtil.setAdress(initialCoords.x, initialCoords.y + PIN_PEAK_Y_CORRECTION);

  mainPinElement.addEventListener('mousedown', window.appState.setActive);
  mainPinElement.addEventListener('mousedown', mouseDownHandler);
  mainPinElement.addEventListener('mouseup', mouseMoveHandler);
  formBtnElement.addEventListener('reset', setInitialMapPinState);
  document.addEventListener('keydown', escPressHandler);
})();
