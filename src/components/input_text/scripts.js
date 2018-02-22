var $ = require('jquery')

$('body').on('change', '.js_inputFill', function (e) {
  if ($(this).val()) {
    $(this).siblings('.form__inputName').addClass('isFill')
  } else {
    $(this).siblings('.form__inputName').removeClass('isFill')
  }
})
