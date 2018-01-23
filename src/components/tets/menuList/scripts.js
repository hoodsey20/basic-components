var $ = require('jquery')

$('body').on('click', '.js-menuList .menuList_toggler', function (e) {
  $(this).parents('.menuList__item').eq(0).toggleClass('isOpen')
})

$('body').on('click', '.js-menuList .isDisabled', function (e) {
  e.preventDefault()
})
