'use strict';

// var items = global.nss.db.collection('items');

class Item{    //when you create a new item, it takes in the Item's type
  constructor(type){
    this.type = type;

    switch(type){
    case 'autogrow':
      this.cost = 50000;
      this.image = '/img/autogrow.jpg';
      break;
    }
  }
}

module.exports = Item;
