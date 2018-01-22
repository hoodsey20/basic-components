var $ = require('jquery')

$('.js-dropdownMenu').each(function (index, item) {
  var currentText = $(item).find('.dropdownMenu__item.isActive').text()
  $(item).find('.dropdownMenu__currentValue').html(currentText)
})

$('body').on('click', '.js-dropdownMenu', function (e) {
  var dropDownList = $(this).find('.dropdownMenu__list')
  if (!dropDownList.is(e.target) && dropDownList.has(e.target).length === 0) {
    $(this).toggleClass('isOpen')
  }
})

$(document).mouseup(function (e) {
  if (!$('.js-dropdownMenu').is(e.target) && $('.js-dropdownMenu').has(e.target).length === 0) {
    $('.js-dropdownMenu').removeClass('isOpen')
  }
})

$('body').on('click', '.js-dropdownMenu .dropdownMenu__item', function (e) {
  var dropDown = $(this).parents('.js-dropdownMenu')
  dropDown.toggleClass('isOpen')
  var currentText = $(this).text()
  dropDown.find('.dropdownMenu__currentValue').html(currentText)
  dropDown.find('.dropdownMenu__item').removeClass('isActive')
  $(this).addClass('isActive')
})
