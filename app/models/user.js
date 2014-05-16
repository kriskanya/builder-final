'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class User{
  constructor(username){
    this.username = username;
    this.wood = 0;
    this.cash = 0;
    this.items = [];
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  sellWood(amount){
    amount = amount * 1;
    if(amount <= this.wood){
      this.wood -= amount;
      this.cash += amount / 5;
    }
  }

  purchase(item){
    if(item.cost <= this.cash){
      this.cash -= item.cost;    //deduct cash from user
      console.log(this);
      console.log(item);
      this.items.push(item);  //push the item into the array
    }
  }

  get isAutoGrowAvailable(){
    var isPresent = _(this.items).any(i=>i.type === 'autogrow');  //loops over all the items and checks if their type === 'autogrow'
    return this.cash >= 50000 && (!isPresent);  //the autogrow button should only show up if you have cash and if you haven't already selected it
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static login(username, fn){
    username = username.trim().toLowerCase();
    users.findOne({username:username}, (e, user)=>{
      if(user){
        user = _.create(User.prototype, user);
        fn(user);
      }else{
        user = new User(username);
        users.save(user, ()=>fn(user));
      }
    });
  }
}

module.exports = User;
