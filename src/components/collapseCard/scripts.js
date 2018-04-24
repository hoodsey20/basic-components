var $ = require('jquery');

$('.js-collapseCard .collapseCard__header').click(function (e) {
  e.preventDefault();
  var collapsedCard = $(this).parents('.collapseCard');
  collapsedCard.toggleClass('collapseCard_isClosed');
  collapsedCard.toggleClass('collapseCard_isOpen');
})
