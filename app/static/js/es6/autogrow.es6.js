/* global ajax, audioBeanStalk */

(function(){
  'use strict';

  init();

  function init(){
    $('#autogrow').click(grow);  //#autogrow is created in autogrow.jade
  }

  var isOn = false;
  var timer;

  function grow(){
    isOn = !isOn;  //toggles autogrow on or off when you click the button
    $('#autogrow').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }

  function growing(){
    $('.alive:not(.beanstalk)').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{  //turn it into a jquery object and ask it for its data-id attribute, array of ids

        var tree = $(`.tree[data-id=${v}]`);  //v is the id of the tree that we're looping over; what you're saying is find on the page something that has that data attribute
        ajax(`/trees/${v}/grow`, 'put', null, h=>{
          tree.replaceWith(h);
          if($(h).hasClass('beanstalk')){
            audioBeanStalk.play();
          }
        });


    });
  }

})();
