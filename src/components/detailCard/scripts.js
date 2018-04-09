window.jQuery = require('jquery');
window.magnify = require('magnify');

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    window.$('.slider__img').magnify();
  }, 2000);
})
