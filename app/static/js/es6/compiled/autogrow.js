(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
    sliderBar();
  }
  var isOn = false;
  var timer;
  function grow() {
    var chopValue = $('#range-slider').val();
    console.log(chopValue);
    isOn = !isOn;
    $('#autogrow').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }
  function growing() {
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/grow"), 'put', null, (function(h) {
        tree.replaceWith(h);
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
      }));
    }));
  }
  function sliderBar() {
    $('#range-slider').noUiSlider({
      start: 40,
      range: {
        'min': 0,
        'max': 10000
      },
      serialization: {
        lower: [$.Link({target: $('#chopValue')})],
        format: {
          thousand: ',',
          prefix: ''
        }
      }
    });
  }
})();

//# sourceMappingURL=autogrow.map
