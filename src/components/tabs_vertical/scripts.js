var $ = require('jquery')

$('body').on('click', '.js_tabs .tabs__item', function (e) {
  var choosenIndex = $(this).attr('data-tabitem')
  var tabParent = $(this).parents('.js_tabs')
  tabParent.find('.tabs__item').removeClass('isActive')
  $(this).addClass('isActive')
  tabParent.find('.tabs__contentItem').removeClass('isOpen')
  tabParent.find('.tabs__contentItem[data-tabcontent="' + choosenIndex + '"]').addClass('isOpen')
})
