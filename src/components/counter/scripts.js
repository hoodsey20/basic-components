var $ = require('jquery');

$('body').on('click', '.js-counter', function (evt) {
  evt.preventDefault();

  var input = $(this).find('.counter__input')[0];
  var buttonUp = $(this).find('[data-set=up]')[0];
  var buttonDown = $(this).find('[data-set=down]')[0];

  switch (evt.target) {
    case buttonUp:
      input.stepUp();
      break;
    case buttonDown:
      input.stepDown();
      break;
  }
})
