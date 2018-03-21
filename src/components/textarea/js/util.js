'use strict';

(function () {
  window.util = {};

  window.util.getRightWorldForm = function (num, one, two, five) {
    var number = Math.abs(num);
    var remainderOfDivisionBy100 = number % 100;
    var remainderOfDivisionBy10 = number % 10;
    var noun = one;

    if (remainderOfDivisionBy100 > 4 && remainderOfDivisionBy100 < 20 || remainderOfDivisionBy10 === 0 || remainderOfDivisionBy10 >= 5) {
      noun = five;
    } else if (remainderOfDivisionBy10 > 1 && remainderOfDivisionBy10 < 5) {
      noun = two;
    }

    return noun;
  };

})();
