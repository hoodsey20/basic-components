window.jQuery = require('jquery');
window.lightSlider = require('lightslider');
var $ = require('jquery');

window.LSFunctions = {
  clearInitialClass: function (el) {
    el.removeClass('slider_notloaded');
  },

  lazyLoad: function (el) {
    var sliderImages = el.find('img');
    sliderImages.each(function (i, item) {
      if ($(item).data('src')) {
        var imageLink = $(item).data('src');
        $(item).attr('src', imageLink);
      }
    });
  },

  customTogglers: function (el) {
    var sliderOuter = el.parents('.slider__outer');
    var togglerLeft = sliderOuter.find('.slider__toggler_left');
    var togglerRight = sliderOuter.find('.slider__toggler_right');
    togglerLeft.click(function () {
      el.goToPrevSlide();
    });
    togglerRight.click(function () {
      el.goToNextSlide();
    });
  },

  checkSlidesLength: function (el) {
    var slides = el.find('.slider__item');
    var minimumSlides = el.attr('data-minslides') ? el.attr('data-minslides') : 2;
    if (slides.length < minimumSlides) {
      el.parents('.slider__outer').addClass('slider__outer_underMinimal');
    }
  },

  fixHeightOfSlider: function (el) {
    var elementsToFixHeight = el.find('.lslide');
    var myArr = [];
    $.each($(elementsToFixHeight), function (index, item) {
      myArr.push($(item).innerHeight());
    });
    var maxHeight = Math.max.apply(null, myArr);
    el.css('min-height', maxHeight + 5 + 'px');
  },

  fixHeightOfSliderAndElements: function (el) {
    var elementsToFixHeight = el.find('.lslide');
    var myArr = [];
    $.each($(elementsToFixHeight), function (index, item) {
      myArr.push($(item).innerHeight());
    });
    var maxHeight = Math.max.apply(null, myArr);
    el.css('min-height', maxHeight + 5 + 'px');
    elementsToFixHeight.css('height', maxHeight + 5 + 'px');
  }
}

window.LSDefaultProps = {
  item: 1,
  slideMargin: 40,
  speed: 500,
  pager: false,
  loop: false,
  enableDrag: false,
  controls: false,
  galleryMargin: 0,
  thumbMargin: false,
  onBeforeStart: function (el) {
    window.LSFunctions.clearInitialClass(el);
    window.LSFunctions.checkSlidesLength(el);
  },
  onSliderLoad: function (el) {
    window.LSFunctions.customTogglers(el);
    window.LSFunctions.lazyLoad(el);
  }
};

window.initLightSlider = function (sliderItem, parentProps, newProps) {
  if (!sliderItem.length) return;
  var instanceProps = parentProps || window.LSDefaultProps;
  var finalProps = newProps ? $.extend(true, {}, instanceProps, newProps) : instanceProps;
  return sliderItem.lightSlider(finalProps);
}
