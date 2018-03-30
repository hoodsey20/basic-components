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

  var roundOff = function (val) {
    var numberTail = val % params.step;
    var MATH_ERROR = 5;
    if (numberTail < val / MATH_ERROR) {
      val = val - numberTail;
    }

    if (val > max) {
      val = max;
    }

    return val;
  };

  if (params.secondRoller === true && rollerParent.querySelectorAll('.roller__circle').length > 1) {
    var roller2 = rollerParent.querySelectorAll('.roller__circle')[1];
    roller2Exist = true;
  }

  function move (pointerPosition, target) {
    var maxRight = rollerParent.offsetWidth;
    var percent = 0;
    var parentDistance = rollerParent.getBoundingClientRect();

    if (!roller2Exist) {
      // значение ширины оси
      var rollerPosition = pointerPosition - parentDistance.left;
      percent = Math.ceil(rollerPosition / maxRight * 100);

      if (percent > 100) {
        percent = 100;
      } else if (percent < 0) {
        percent = 0;
      }

      roller.style.left = percent + '%';

      value1 = ((percent * differenceValue / 100) + min).toFixed(0);

      // если установлен шаг
      if (params.step) {
        value1 = roundOff(value1);
      }

      if (shaftIndicator) {
        shaftIndicator.style.width = 100 - percent + '%';
      }
      currentChangedInput = 1;
    }
    // end one roller condition

    if (roller2Exist) {
      roller1position = Number(roller.style.left.split('%')[0]) || roller1position;
      roller2position = Number(roller2.style.right.split('%')[0]) || roller2position;
      rollerPosition = pointerPosition - parentDistance.left;
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

          if (params.step) {
            value1 = roundOff(value1);
          }

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

          if (params.step) {
            value2 = roundOff(value2);
          }

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

  var maxRight = rollerParent.offsetWidth;
  var parentDistance = rollerParent.getBoundingClientRect();

  if (params.startValue) {
    var startCoef = params.startValue > max ? 1 : (params.startValue - min) / differenceValue;
    var startPx = maxRight * startCoef + parentDistance.left;
    move(startPx);
  }

  if (params.endValue) {
    var endCoef = params.endValue > max ? 1 : (params.endValue - min) / differenceValue;
    var endPx = maxRight * endCoef + parentDistance.left;
    move(endPx, roller2);
  }

  // событие по клику на ось
  rollerParent.addEventListener('click', function (e) {
    if (e.target !== roller) {
      move(e.pageX, e.target);
    }
  });

  // события для мыши
  function mouseListener (element) {
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

  function touchListener (element) {
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

/// инициализация
var singleRoller = document.getElementById('singleRoller');
var singleRollerInput = document.querySelector('[name=singleRoller_start]');

var moveHandler = function (val1, val2, input) {
  singleRollerInput.value = val1 + '/' + val2;
};

var mouseUpHandler = function (val1, val2, input) {
  console.log('onMouseUp');
};

var singleRollerProps = {
  parentElement: singleRoller,
  minValue: 200,
  maxValue: 8000,
  step: 200,
  onMove: moveHandler,
  onMouseUp: mouseUpHandler
};
window.roller(singleRollerProps);

// инициализация двойного ролика

var doubleRoller = document.getElementById('doubleRoller');

var doubleRollerProps = {
  parentElement: doubleRoller,
  minValue: 200,
  maxValue: 8000,
  secondRoller: true,
  roller1position: 1000,
  roller2position: 5000,
  step: 200
};

window.roller(doubleRollerProps);