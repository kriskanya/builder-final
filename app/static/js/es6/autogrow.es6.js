/* global ajax, audioBeanStalk */

(function(){
  'use strict';

  init();

  function init(){
    $('#autogrow').click(grow);  //#autogrow is created in autogrow.jade
    sliderBar();
  }

  var isOn = false;
  var timer;

  function grow(){
    var chopValue = $('#range-slider').val();   //chopValue
    console.log(chopValue);

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
    // $('#alive .height').text().trim

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

  function sliderBar(){
    $('#range-slider').noUiSlider({
    	start: 40,
    	range: {
    		'min': 0,
    		'max': 10000
      },
        serialization: {
  		lower: [
  		// Write the values to
  		// an input with id 'field'
  			$.Link({
  				target: $('#chopValue')
  			})
  		],
  		format: {
  		// Set formatting
  			thousand: ',',
  			prefix: ''
  		}
  	}

    });
  }

})();
