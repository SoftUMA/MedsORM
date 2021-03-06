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
    color: '',
    lab: -1,
    lab_nombre: ''
  };
  this.meds = [];
  this.labs = [];
  this.disableEdition = true;
  this.disableButtons = true;

  this.socket.emit('loadMeds', 'gimme the list !');
  this.socket.on('medsResponse', function(data) {
    that.meds = [];

    for (var i = 0; i < data.length; i++) {
      var tmp = {};
      tmp.id = data[i].ID_MEDICAMENTO;
      tmp.nombre = data[i].NOMBRE_MEDICAMENTO;
      tmp.cantidad = data[i].CANTIDAD_DISPONIBLE;
      tmp.color = 'black';
      if (tmp.cantidad < 10) tmp.color = 'red';
      tmp.lab = data[i].LABORATORIO;
      that.meds.push(tmp);
    }

    $('#botonMagico').click();
  });

  this.socket.emit('loadLabs', 'gimme the labs !');
  this.socket.on('labsResponse', function(data) {
    that.labs = [];

    for (var i = 0; i < data.length; i++) {
      var tmp = {};
      tmp.id = data[i].ID_LABORATORIO;
      tmp.nombre = data[i].NOMBRE_LABORATORIO;
      that.labs.push(tmp);
    }

    $('#botonMagico').click();
  });

  this.socket.emit('userPerms', 'gimme the perms !');
  this.socket.on('userPermsResponse', function(data) {
    console.log(data);

    that.disableEdition = !data.EDICION.acceso;
    that.disableButtons = !data.BOTONES.acceso;

    $('#botonMagico').click();
  });

  this.onRowSelected = function() {
    this.selected.id = this.selectedRow;
    this.socket.emit('medData', this.selectedRow);
  };
  this.socket.on('medDataResponse', function(data) {
    // that.selected.id = data.ID_MEDICAMENTO;
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

  this.onLabSelected = function(labId, labNombre) {
    this.selected.lab = labId;
    this.selected.lab_nombre = labNombre;
  };

  this.insert = function() {
    this.socket.emit('insert', this.selected);
  };
  this.socket.on('insertSuccess', function(data) {
    that.socket.emit('loadMeds', 'gimme the list !');
  });

  this.modify = function() {
    var data = {};
    data.id = this.selectedRow;
    data.instance = this.selected;
    console.log(data);
    this.socket.emit('modify', data);
  };
  this.socket.on('modifySuccess', function(data) {
    that.socket.emit('loadMeds', 'gimme the list !');
  });

  this.delete = function() {
    this.socket.emit('delete', this.selected);
  };
  this.socket.on('deleteSuccess', function(data) {
    that.socket.emit('loadMeds', 'gimme the list !');
  });

  this.clean = function() {
    this.selectedRow = -1;
    this.selected = {
      id: '',
      nombre: '',
      cantidad: '',
      lab: -1,
      lab_nombre: ''
    };
  };

  this.exit = function() {
    this.socket.emit('exit', 'get me outta here !')
  };
  this.socket.on('getOut', function(data) {
    window.location.href = data;
  });

  this.socket.on('insertError', function(data) {
    $('#insertModal').modal({
      keyboard: true,
      show: true
    });
  });

  this.socket.on('modifyError', function(data) {
    $('#modifyModal').modal({
      keyboard: true,
      show: true
    });
  });

  this.socket.on('deleteError', function(data) {
    $('#deleteModal').modal({
      keyboard: true,
      show: true
    });
  });

  this.socket.on('unprivilegedError', function(data) {
    $('#unprivilegedModal').modal({
      keyboard: true,
      show: true
    });
  });

  this.doMagic = function() {};
});
