/* global ajax, forest */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoroot').click(autoRoot);  //#autogrow is created in autogrow.jade
  }

  var isOn = false;
  var timer;

  function autoRoot(){
    isOn = !isOn;  //toggles autogrow on or off when you click the button
    $('#autoroot').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(killRoots, 1000);
  }

  function killRoots(){
    $('.dead').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{
      ajax(`/trees/${v}/destroy`, 'put', null, null);
        forest();
    });
  }

})();
