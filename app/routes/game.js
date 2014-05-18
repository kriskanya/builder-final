'use strict';

exports.index = (req, res)=>{
  res.render('game/index', {title: 'Tree Game'});
};
