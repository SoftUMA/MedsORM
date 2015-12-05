'use strict';

/**
 * @ngdoc function
 * @name medsOrmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the medsOrmApp
 */
angular.module('medsOrmApp').controller('MainCtrl', function() {
  var that = this;
  this.socket = io();
  this.meds = [];

  this.socket.emit('loadMeds', 'gimme the list !');
  this.socket.on('medsResponse', function(data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      var tmp = {};
      tmp.id = data[i].ID_MEDICAMENTO;
      tmp.nombre = data[i].NOMBRE_MEDICAMENTO;
      tmp.cantidad = data[i].CANTIDAD_DISPONIBLE;
      tmp.lab = data[i].LABORATORIO;
      that.meds.push(tmp);
    }
  });

  this.testing = function() {
    console.log(this.meds);
    console.log('id: ' + this.meds[0].id);
    console.log('nombre: ' + this.meds[0].nombre);
    console.log('laboratorio: ' + this.meds[0].lab);
    console.log('cantidad: ' + this.meds[0].cantidad);
  };
});
