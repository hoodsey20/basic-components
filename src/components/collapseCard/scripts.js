var $ = require('jquery');

$('.js-collapseCard .collapseCard__header').click(function (e) {
  e.preventDefault();
  var collapsedCard = $(this).parents('.collapseCard');
  collapsedCard.toggleClass('isClosed');
  collapsedCard.toggleClass('isOpen');
})
