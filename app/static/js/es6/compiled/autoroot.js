(function() {
  'use strict';
  init();
  function init() {
    $('#autoroot').click(autoRoot);
  }
  var isOn = false;
  var timer;
  function autoRoot() {
    isOn = !isOn;
    $('#autoroot').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(killRoots, 1000);
  }
  function killRoots() {
    $('.dead').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      ajax(("/trees/" + v + "/destroy"), 'put', null, null);
      forest();
    }));
  }
})();

//# sourceMappingURL=autoroot.map
