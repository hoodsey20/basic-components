var $ = require('jquery')

$('body').on('click', '.js_multiSelect', function (e) {
  $(this).find('.select__optionList').toggle()
})

$('body').on('click', '.js_multiSelect .option', function (e) {
  $(this).toggleClass('isChecked')
  $(this).parents('.js_multiSelect').addClass('isCompleted')
  var checkedText = $(this).text()
  $(this).parents('.js_multiSelect').find('.select__sheckedValue').append('<span>' + checkedText + '</span>')
  console.log(checkedText)
  // $(this).parents('.js_multiSelect').find('.select__sheckedValue').text
})
