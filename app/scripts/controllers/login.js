'use strict';

/**
 * @ngdoc function
 * @name medsOrmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the medsOrmApp
 */
angular.module('medsOrmApp').controller('LoginCtrl', function() {
  this.socket = io();
  this.user = "";
  this.pass = "";
  this.myWindow;

  this.testLogin = function() {
    this.socket.emit('login', {
      testUser: this.user,
      testPass: this.pass
    });
  };

  this.socket.on('error', function(data) {
    $('#errorModal').modal({
      keyboard: true,
      show: true
    });
  });

  this.socket.on('redirect', function(data) {
    window.location.href = data;
  });
});
