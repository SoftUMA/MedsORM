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
  this.selectedRow = -1;
  this.selected = {
    id: '',
    nombre: '',
    cantidad: '',
    lab: -1,
    lab_nombre: 'Laboratorio'
  };
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

    $('#botonMagico').click();
  });

  this.onRowSelected = function() {
    this.selected.id = this.selectedRow;
    this.socket.emit('medData', this.selectedRow);
  };
  this.socket.on('medDataResponse', function(data) {
    that.selected.id = data.ID_MEDICAMENTO;
    that.selected.nombre = data.NOMBRE_MEDICAMENTO;
    that.selected.cantidad = data.CANTIDAD_DISPONIBLE;
    that.selected.lab = data.LABORATORIO;
    that.socket.emit('labName', that.selected.lab);
  });
  this.socket.on('labNameResponse', function(data) {
    that.selected.lab_nombre = data;
    console.log(that.selected);
    $('#botonMagico').click();
  });

  this.insert = function() {
    this.socket.emit('insert', this.selected);
  };

  this.modify = function() {
    this.socket.emit('modify', this.selected);
  };

  this.delete = function() {
    this.socket.emit('delete', this.selected);
  };

  this.clean = function() {

  };

  this.exit = function() {
    this.socket.emit('exit', 'get me outta here !')
  };
  this.socket.on('getOut', function(data) {
    window.location.href = data;
  });

  this.doMagic = function() {};
});
