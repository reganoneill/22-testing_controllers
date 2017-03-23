'use strict';

// require('./scss/reset.scss');
// require('./scss/main.scss');

require('./scss/core.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

const cowsayLab = angular.module('cowsayLab', []);

cowsayLab.controller('CowsayController', ['$log', CowsayController]);

function CowsayController($log){
  $log.debug('CowsayController');

  this.title = 'Creature Creeps! Make Em Speak!';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = this.cowfiles[0];
  });

  this.update = function(input){
    $log.debug('cowsayCtrl.update');
    return cowsay.say({ text: input || 'Say wuuuut?!', f: this.current });
  };

  this.speak = function(input){
    $log.debug('cowsayCtrl.speak');
    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function(){
    $log.debug('cowsayCtrl.undo');
    this.history.pop();
    this.spoken = this.history.pop() || '';
  };
}

cowsayLab.controller('NavController', ['$log', NavController]);

function NavController($log){
  $log.debug('NavController');
  this.routes = [
    {
      name: 'home',
      url: '/home'
    },
    {
      name: 'about',
      url: '/about'
    },
    {
      name: 'contact',
      url: '/contact-us'
    }
  ];
}
