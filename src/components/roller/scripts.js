'use strict';

window.roller = function (params) {
  if (!params.parentElement) return false;

  var rollerParent = params.parentElement;
  var min = params.minValue;
  var max = params.maxValue;
  var roller = rollerParent.querySelectorAll('.roller__circle')[0];
  var shaftIndicator = rollerParent.querySelector('.roller__shaft-indicator');
  var currentChangedInput = false;
  var roller2Exist = false;
  var currentTarget = roller;
  var roller1position = 0;
  var roller2position = 0;
  var value1 = min;
  var value2 = max;
  var step = params.step || (max - min) / 20;
  // разница между максимальным и минимальным значением на оси X
  var differenceValue = max - min;
  var shaftIndicatorFromLeft = 0;
  var shaftIndicatorFromRight = 0;

  var rollerWidth = rollerParent.offsetWidth;
  var circleWidth = roller.offsetWidth;
  var circleToRollerRatio = circleWidth / rollerWidth;
  var defaultGap = Math.floor(differenceValue * circleToRollerRatio) * 2;
  var gap = params.gap || defaultGap;
  var procentGap = Math.floor((gap * 100) / (max - min));
  var maxRight = rollerParent.offsetWidth;
  var parentLongitude = rollerParent.getBoundingClientRect().left;

  if (!!params.secondRoller && rollerParent.querySelectorAll('.roller__circle').length > 1) {
    var roller2 = rollerParent.querySelectorAll('.roller__circle')[1];
    roller2Exist = true;
  }

  var roundOff = function (val) {
    var value = Number(val);

    if (value === step) return value;

    var numberTail = value % step;

    if (value === numberTail) {
      if (value > step / 2) {
        value = step;
      } else {
        value = min;
      }
      return value;
    }

    if (value > numberTail) {
      value = value - numberTail;

      if (value > max || value + numberTail >= max) {
        value = max;
      }
      return value;
    }
  };

  var move = function (pointerPosition, target) {
    var maxRight = rollerParent.offsetWidth;
    var percent = 0;
    var parentLongitude = rollerParent.getBoundingClientRect().left;
    if (!roller2Exist) {
      // значение ширины оси
      var rollerPosition = pointerPosition - parentLongitude;
      percent = Math.ceil(rollerPosition / maxRight * 100);

      if (percent > 100) {
        percent = 100;
      } else if (percent < 0) {
        percent = 0;
      }

      roller.style.left = percent + '%';

      value1 = ((percent * differenceValue / 100) + min).toFixed(0);
      value1 = roundOff(value1);

      if (shaftIndicator) {
        shaftIndicator.style.width = 100 - percent + '%';
      }
      currentChangedInput = 1;
    }
    // end one roller condition

    if (roller2Exist) {
      roller1position = Number(roller.style.left.split('%')[0]) || roller1position;
      roller2position = Number(roller2.style.right.split('%')[0]) || roller2position;
      rollerPosition = pointerPosition - parentLongitude;
      percent = Math.ceil(rollerPosition / maxRight * 100);

      if (target === roller) {
        currentTarget = roller;
      } else if (target === roller2) {
        currentTarget = roller2;
      }

      if (percent > 100) {
        percent = 100;
      } else if (percent < 0) {
        percent = 0;
      }

      if (currentTarget === roller) {
        currentChangedInput = 1;

        if (percent + roller2position <= 100 - procentGap) {
          roller.style.left = percent + '%';
          value1 = ((percent * differenceValue / 100) + min).toFixed(0);
          value1 = roundOff(value1);

          if (shaftIndicator) {
            shaftIndicatorFromLeft = percent;
            shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%';
          }
        }
      }

      if (currentTarget === roller2) {
        currentChangedInput = 2;

        if ((100 - percent) + roller1position <= 100 - procentGap) {
          roller2.style.right = (100 - percent) + '%';
          value2 = ((percent * differenceValue / 100) + min).toFixed(0);
          value2 = roundOff(value2);

          if (shaftIndicator) {
            shaftIndicatorFromRight = (100 - percent);
            shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%';
            shaftIndicator.style.right = (100 - percent) + '%';
          }
        }
      }
    }
    // end multi rollers condition
    if (params.onMove) {
      params.onMove(value1, value2, currentChangedInput);
    }
  }
  // end move function

  if (params.startValue) {
    debugger;
    var startCoef = params.startValue > max ? 1 : (params.startValue - min) / differenceValue;
    var startPx = maxRight * startCoef + parentLongitude;
    move(startPx);
  }

  if (params.endValue) {
    var endCoef = params.endValue > max ? 1 : (params.endValue - min) / differenceValue;
    var endPx = maxRight * endCoef + parentLongitude;
    move(endPx, roller2);
  }

  // событие по клику на ось
  var clickListener = function (e) {
    if (roller2Exist) {
      if (e.target !== roller && e.target !== roller2) {
        move(e.pageX);
      }
      return;
    }

    if (e.target !== roller) move(e.pageX);
  }

  rollerParent.addEventListener('click', clickListener);

  // события для мыши
  var mouseListener = function (element) {
    element.onmousedown = function () {
      document.onmousemove = function (e) {
        move(e.pageX, e.target);
      };
      document.onmouseup = function () {
        if (params.onMouseUp) {
          params.onMouseUp(value1, value2, currentChangedInput);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  mouseListener(roller);

  if (roller2Exist) {
    mouseListener(roller2);
  }

  // события для touch

  var touchListener = function (element) {
    if (window.TouchEvent) {
      var touchMove = function (e) {
        var touchobj = e.changedTouches[0];
        var startx = parseInt(touchobj.pageX);
        move(startx, e.target);
      };

      element.addEventListener('touchstart', function () {
        element.addEventListener('touchmove', touchMove, false);
      }, false);
    }
  }

  touchListener(roller);

  if (roller2Exist) {
    touchListener(roller2);
  }
};
