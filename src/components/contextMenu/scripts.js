var $ = require('jquery')

$('body').on('click', '.js-contextMenu .contextMenu__button', function (e) {
  var contextMenu = $(this).parents('.contextMenu');
  contextMenu.toggleClass('isOpen');
})

$(document).mouseup(function (e) {
  if (!$('.contextMenu__content').is(e.target) &&
    !$('.contextMenu__button').is(e.target) &&
   $('.contextMenu__content').has(e.target).length === 0) {
    $('.contextMenu').removeClass('isOpen');
  }
})
