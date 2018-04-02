var $ = require('jquery');

var tabsWork = function (e, jqSelf) {
  var choosenIndex = jqSelf.attr('data-tabitem');
  var tabParent = jqSelf.parents('.js-tabs');
  tabParent.find('.tabs__item').removeClass('isActive');
  jqSelf.addClass('isActive');
  tabParent.find('.tabs__contentItem').removeClass('isOpen');
  tabParent.find('.tabs__contentItem[data-tabcontent="' + choosenIndex + '"]').addClass('isOpen');
}

$('body').on('click', '.js-tabs .tabs__item', function (e) {
  var self = $(this);
  tabsWork(e, self);
});

$('body').on('keypress', '.js-tabs .tabs__item', function (e) {
  if (e.which === 13) {
    var self = $(this);
    tabsWork(e, self);
  }
});
