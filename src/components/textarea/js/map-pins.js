'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var PIN_ELEMENTS_QUANTITY = 5;

  var createOfferPin = function (offer) {
    var templateElement = document.querySelector('template');
    var mapPinTemplate = templateElement.content.querySelector('.map__pin');
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
    pinImg.src = offer.author.avatar;

    pinElement.addEventListener('click', function () {
      window.offerCard.remove();
      window.offerCard.render(offer);
    });

    return pinElement;
  };

  window.mapPins = {};

  window.mapPins.remove = function () {
    var pinsElements = document.querySelectorAll('.map__pin');

    if (pinsElements.length < 2) {
      return;
    }

    pinsElements = Array.prototype.slice.call(pinsElements, 1);
    pinsElements.forEach(function (element) {
      element.remove();
    });
  };

  window.mapPins.render = function (offers) {
    var mapPinsContainerELement = document.querySelector('.map__pins');
    var mapPinsFragment = document.createDocumentFragment();
    offers.slice(0, PIN_ELEMENTS_QUANTITY).forEach(function (element) {
      mapPinsFragment.appendChild(createOfferPin(element));
    });
    mapPinsContainerELement.appendChild(mapPinsFragment);
  };
})();
