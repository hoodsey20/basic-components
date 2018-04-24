var $ = require('jquery');

$('.js-button').click(function (e) {
  e.preventDefault();
  window.alert('button click');
})
