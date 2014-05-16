'use strict';

var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  grow(){
    var max = this.isAdult ? this.height*0.10 : 2;
    this.height += _.random(0, max, true);

    var min = this.isAdult ? 200 - ((this.height/12)*0.10) : 200;
    min = min < 10 ? 10 : min;

    console.log('------');
    console.log(min);
    var rnd = _.random(0, min, true);
    console.log(rnd);

    this.isHealthy = rnd > 1;

    // if(!this.isAdult){
    //   this.height += _.random(0, 2, true);  //if the tree is not an adult, it will grow up to 2 inches
    // }else{
    //   var max = this.height*0.1;
    //   this.height += _.random(0, max, true);  //if the tree is an adult, it will grow up to 10% of the height
    // }
    //
    // if(!this.isAdult){
    //   this.isHealthy = _.random(0, 200, true) !==71;    //min, max, floating point number:true
    // }else{
    //   var max = this.height * 0.1;
    //   if(max > 10){
    //
    //   }
    //   else
    //   this.isHealthy =
    // }
    //this.isHealthy = _.random(0, 200) !== 71;
  }

  chop(user){
    user.wood += this.height / 2;
    this.height = 0;
    this.isHealthy = false;
    this.isChopped = true;
  }

  get isAdult(){  //if you put 'get' in front of this function, you can call it like a data property
    return this.height >= 48;
  }

  get isGrowable(){
    return this.isHealthy && !this.isBeanStalk;
  }

  get isChoppable(){
    return this.isAdult && this.isHealthy && !this.isBeanStalk;
  }

  get isBeanStalk(){
    return (this.height / 12) > 50;
  }

  get classes(){
    var classes = [];

    if(this.height === 0){
      classes.push('seed');
    }else if(this.height < 24){
      classes.push('sapling');
    }else if(!this.isAdult){
      classes.push('treenager');
    }else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }else{
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('stump');
    }

    if(this.isBeanStalk){
      classes.push('beanstalk');
    }

    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e,objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>fn(tree));
  }
}

module.exports = Tree;
