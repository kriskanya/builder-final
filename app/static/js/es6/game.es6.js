/* jshint unused:false */

var audioChop, audioBeanStalk;

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell-wood', sellWood);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    preloadAssets();
  }


  function purchaseAutoGrow(){
    //create a function where the wood grows automatically once you buy this feature
    items();
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}/purchase/autogrow`, 'put', null, h=>{
      $('#dashboard').empty().append(h);

    });

  }

  function preloadAssets(){
    audioChop = $('<audio>')[0];  //preloads sound asset
    audioChop.src = '/audios/chop.wav';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.wav';
    }

  function sellWood(){
    var userId = $('#user').attr('data-id');
    var amount = $('#wood-amt').val();
    ajax(`/users/${userId}/sellwood`, 'put', {amount:amount}, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function chop(){
    audioChop.play();  //plays audio file
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, h=>{
      tree.replaceWith(h);
      dashboard();
    });
  }

  function dashboard(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}`, 'get', null, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h=>{
      tree.replaceWith(h);
      if($(h).hasClass('beanstalk')){
        audioBeanStalk.play();
      }
    });
  }

  function forest(){
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, h=>{
      $('#forest').empty().append(h);
    });
  }

  function items(){
    var userId = $('#user').attr('data-id');
    ajax(`/items?userId=${userId}`, 'get', null, h=>{
      $('#items').empty().append(h);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h=>{
      $('#forest').append(h);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h=>{
      $('#username').val('');
      $('#dashboard').empty().append(h);
      forest();
      items();
    });
  }



})();

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
