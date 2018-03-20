var $ = require('jquery')

$('body').on('click', '.js_select', function (e) {
  $(this).find('.select__optionList').toggle()
})

$('.js_select').on('click', '.option', function (e) {
  var selectText = $(this).text()
  var selectVal = $(this).attr('data-value')
  $(this).parents('.select_custom').addClass('isCompleted')
  $(this).parents('.select_custom').find('.select__sheckedValue').text(selectText)
  $(this).parents('.select_custom').find('.select__sheckedValue').attr('data-value', selectVal)
})
