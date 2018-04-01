'use strict';

window.roller = function (params) {
  if (!params.parentElement) return false;

  // consts
  var MIN = params.minValue;
  var MAX = params.maxValue;
  var DIFFERENCE = MAX - MIN;
  var DEFAULT_STEPS_QUNTITY = 20;
  var STEP = params.step || DIFFERENCE / DEFAULT_STEPS_QUNTITY;

  // nodes
  var rollerNode = params.parentElement;
  var rollerHandler = rollerNode.querySelectorAll('.roller__circle')[0];
  var rollerHandler2 = null;
  var shaftIndicator = rollerNode.querySelector('.roller__shaft-indicator');
  var isSecondHandler = false;
  if (params.secondRoller && rollerNode.querySelectorAll('.roller__circle').length > 1) {
    rollerHandler2 = rollerNode.querySelectorAll('.roller__circle')[1];
    isSecondHandler = true;
  }

  // callback vars
  var value1 = MIN;
  var value2 = MAX;
  var currentChangedInput = false;

  var currentTarget = rollerHandler;
  var handlerPosition = 0;
  var secondHandlerPosition = 0;

  var rollerNodeLongitude = rollerNode.offsetWidth;
  var parentLongitudeFromLeft = rollerNode.getBoundingClientRect().left;

  var shaftIndicatorFromLeft = 0;
  var shaftIndicatorFromRight = 0;

  var getProcentGap = function () {
    var procentGap = null;

    if (params.gap) {
      procentGap = Math.floor((params.gap * 100) / (MAX - MIN));
      return procentGap;
    }

    var rollerWidth = rollerNode.offsetWidth;
    var circleWidth = rollerHandler.offsetWidth;
    var circleToRollerRatio = circleWidth / rollerWidth;
    var defaultGap = Math.floor(DIFFERENCE * circleToRollerRatio) * 2;
    var gap = defaultGap;

    procentGap = Math.floor((gap * 100) / (MAX - MIN));

    return procentGap;
  }

  var roundOff = function (val) {
    var value = val;
    if (val !== 0) {
      value = Number(val).toFixed(0);
    }

    if (value === STEP) return value;

    var numberTail = value % STEP;

    if (value === numberTail) {
      if (value > STEP / 2) {
        value = STEP;
      } else {
        value = MIN;
      }
      return value;
    }

    if (value > numberTail) {
      value = value - numberTail;

      if (value > MAX || value + numberTail >= MAX) {
        value = MAX;
      }
      return value;
    }
  };

  var getHandlerPositionPercent = function (handlerPosition, totalLongitude) {
    var handlerPositionPercent = Math.ceil(handlerPosition / totalLongitude * 100);

    if (handlerPositionPercent > 100) {
      handlerPositionPercent = 100;
    } else if (handlerPositionPercent < 0) {
      handlerPositionPercent = 0;
    }

    return handlerPositionPercent;
  }

  var move = function (pointerPosition, target) {
    var procentGap = getProcentGap();
    var rollerNodeLongitude = rollerNode.offsetWidth;
    var parentLongitudeFromLeft = rollerNode.getBoundingClientRect().left;
    var rollerPosition = pointerPosition - parentLongitudeFromLeft;
    var percent = getHandlerPositionPercent(rollerPosition, rollerNodeLongitude);

    if (!isSecondHandler) {
      currentChangedInput = 1;
      rollerHandler.style.left = percent + '%';
      shaftIndicator.style.width = 100 - percent + '%';

      value1 = roundOff(percent * DIFFERENCE / 100 + MIN);
    }
    // end one roller condition

    if (isSecondHandler) {
      handlerPosition = Number(rollerHandler.style.left.split('%')[0]) || handlerPosition;
      secondHandlerPosition = Number(rollerHandler2.style.right.split('%')[0]) || secondHandlerPosition;

      if (target === rollerHandler || target === rollerHandler2) {
        currentTarget = target;
      }

      if (currentTarget === rollerHandler) {
        currentChangedInput = 1;

        if (percent + secondHandlerPosition <= 100 - procentGap) {
          rollerHandler.style.left = percent + '%';
          shaftIndicatorFromLeft = percent;
          shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%';

          value1 = roundOff(percent * DIFFERENCE / 100 + MIN);
        }
      }

      if (currentTarget === rollerHandler2) {
        currentChangedInput = 2;

        if ((100 - percent) + handlerPosition <= 100 - procentGap) {
          rollerHandler2.style.right = (100 - percent) + '%';

          shaftIndicatorFromRight = (100 - percent);
          shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%';
          shaftIndicator.style.right = (100 - percent) + '%';

          value2 = roundOff(percent * DIFFERENCE / 100 + MIN);
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
    var startCoef = params.startValue > MAX ? 1 : (params.startValue - MIN) / DIFFERENCE;
    var startPx = rollerNodeLongitude * startCoef + parentLongitudeFromLeft;
    move(startPx);
  }

  if (params.endValue) {
    var endCoef = params.endValue > MAX ? 1 : (params.endValue - MIN) / DIFFERENCE;
    var endPx = rollerNodeLongitude * endCoef + parentLongitudeFromLeft;
    move(endPx, rollerHandler2);
  }

  // событие по клику на ось
  var clickListener = function (e) {
    if (isSecondHandler) {
      if (e.target !== rollerHandler && e.target !== rollerHandler2) {
        move(e.pageX);
      }
      return;
    }

    if (e.target !== rollerHandler) move(e.pageX);
  }

  rollerNode.addEventListener('click', clickListener);

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

  mouseListener(rollerHandler);

  if (isSecondHandler) {
    mouseListener(rollerHandler2);
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

  touchListener(rollerHandler);

  if (isSecondHandler) {
    touchListener(rollerHandler2);
  }
};
