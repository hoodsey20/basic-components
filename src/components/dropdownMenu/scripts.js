var $ = require('jquery')

$('.js-dropdownMenu').each(function (index, item) {
  var activeItem = $(item).find('.dropdownMenu__item.isActive');
  var input = $(item).find('.dropdownMenu__input');
  var currentValueContainer = $(item).find('.dropdownMenu__currentValue');

  var currentText = activeItem.text();
  var currentDataValue = activeItem.data('value');

  input.attr('value', currentDataValue);

  if (activeItem.length) {
    currentValueContainer.html(currentText);
  }
});

$('body').on('click', '.js-dropdownMenu', function (e) {
  var dropDownList = $(this).find('.dropdownMenu__list');
  if (!dropDownList.is(e.target) && dropDownList.has(e.target).length === 0) {
    $(this).toggleClass('isOpen');
  }
})

$(document).mouseup(function (e) {
  if (!$('.js-dropdownMenu').is(e.target) && $('.js-dropdownMenu').has(e.target).length === 0) {
    $('.js-dropdownMenu').removeClass('isOpen');
  }
})

$('body').on('click', '.js-dropdownMenu .dropdownMenu__item', function (e) {
  var dropDown = $(this).parents('.js-dropdownMenu');
  var currentText = $(this).text();
  var input = dropDown.find('.dropdownMenu__input');
  var currentDataValue = $(this).data('value');

  input.attr('value', currentDataValue);
  dropDown.find('.dropdownMenu__currentValue').html(currentText);
  dropDown.find('.dropdownMenu__item').removeClass('isActive');

  dropDown.toggleClass('isOpen');
  $(this).addClass('isActive');
})
