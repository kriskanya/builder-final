(function() {
  'use strict';
  init();
  function init() {
    $('#autoseed').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autoseed').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(plant, 1000);
  }
  function plant() {
    var numOfTrees = $('.alive:not(.beanstalk)').length;
    if (numOfTrees <= 50) {
      var userId = $('#user').attr('data-id');
      ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
        $('#forest').append(h);
      }));
    } else {
      console.log('too many trees!');
    }
  }
})();

//# sourceMappingURL=autoseed.map
