/* global ajax */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoseed').click(grow);  //#autogrow is created in autogrow.jade
  }

  var isOn = false;
  var timer;

  function grow(){
    isOn = !isOn;  //toggles autogrow on or off when you click the button
    $('#autoseed').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(plant, 1000);
  }

  function plant(){
    //if there are 50 trees with class 'alive' and '!beanstalk', then do not do this
    var numOfTrees = $('.alive:not(.beanstalk)').length;
    if(numOfTrees <= 50){
      var userId = $('#user').attr('data-id');
      ajax('/trees/plant', 'post', {userId:userId}, h=>{
        $('#forest').append(h);
      });
    }else{
      console.log('too many trees!');
    }
  }


})();
