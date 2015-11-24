'use strict';

/**
 * @ngdoc function
 * @name medsOrmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the medsOrmApp
 */
angular.module('medsOrmApp')
  .controller('LoginCtrl', function() {
    this.user = "";
    this.pass = "";
    this.correctUser = "carlosaguilar";
    this.correctPass = "123456";

    this.testLogin = function() {
    	if (this.user === this.correctUser && this.pass === this.correctPass) {
    		console.log("IT'S OK !!! ");
    	} else {
    		console.log("GO AWAY !");
    	}
    }
  });
