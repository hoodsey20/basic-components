'use strict';

(function () {
  var OFFER_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  var renderOfferPictures = function (picturesContainer, pictures) {
    var picturesFragment = document.createDocumentFragment();
    var pictureItemElement = picturesContainer.querySelector('li');

    pictures.forEach(function (element) {
      var offerPictureElement = pictureItemElement.cloneNode(true);
      offerPictureElement.querySelector('img').src = element;
      offerPictureElement.querySelector('img').width = 50;
      picturesFragment.appendChild(offerPictureElement);
    });

    picturesContainer.appendChild(picturesFragment);
  };

  var deleteOddFeatures = function (featureItems, featuresList) {
    featureItems.forEach(function (element) {
      if (featuresList.indexOf(element.className.split('--')[1]) === -1) {
        element.remove();
      }
    });
  };

  var removeOfferCard = function () {
    var offerCardElement = document.querySelector('.map__card');
    if (offerCardElement) {
      offerCardElement.remove();
    }
  };

  window.offerCard = {};

  window.offerCard.remove = function () {
    var offerCardElement = document.querySelector('.map__card');
    if (offerCardElement) {
      offerCardElement.remove();
    }
  };

  window.offerCard.render = function (offerItem) {
    var templateElement = document.querySelector('template');
    var mapFiltersContainerElement = document.querySelector('.map__filters-container');
    var offerCardTemplate = templateElement.content.querySelector('.map__card');
    var offerCard = offerCardTemplate.cloneNode(true);
    var paragraphElements = offerCard.querySelectorAll('p');
    var featureElements = offerCard.querySelectorAll('.feature');
    var picturesContainerElement = offerCard.querySelector('.popup__pictures');
    var closeElement = offerCard.querySelector('.popup__close');
    var currentRoomsWordForm = window.util.getRightWorldForm(offerItem.offer.rooms, 'комната', 'комнаты', 'комнат');
    var guestsRoomsWordForm = window.util.getRightWorldForm(offerItem.offer.guests, 'гостя', 'гостей', 'гостей');

    offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;
    offerCard.querySelector('h3').textContent = offerItem.offer.title;
    offerCard.querySelector('.popup__price').textContent = offerItem.offer.price + '₽/ночь';
    offerCard.querySelector('h4').textContent = OFFER_TYPES[offerItem.offer.type];

    paragraphElements[0].textContent = offerItem.offer.address;
    paragraphElements[2].textContent = offerItem.offer.rooms + ' ' + currentRoomsWordForm + ' для ' + offerItem.offer.guests + ' ' + guestsRoomsWordForm;
    paragraphElements[3].textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    paragraphElements[4].textContent = offerItem.offer.description;

    deleteOddFeatures(featureElements, offerItem.offer.features);
    renderOfferPictures(picturesContainerElement, offerItem.offer.photos);
    closeElement.addEventListener('click', removeOfferCard);
    mapFiltersContainerElement.parentNode.insertBefore(offerCard, mapFiltersContainerElement);
  };
})();
