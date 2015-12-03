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
    this.Sequelize = require('sequelize');

    this.sequelize = new this.Sequelize('database.db', null, null, {
      dialect: 'sqlite',
      storage: 'data/database.db'
    });

    this.Usuario = this.sequelize.define('tUsuario', {
      nombre: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING
      },
      rolName: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });

    this.user = "";
    this.pass = "";

    this.validateLogin = function(validateUserName, validatePassword) {
      this.Usuario.findAll({
        where: {
          nombre: validateUserName
        }
      }).then(function(result) {
        if (result[0].dataValues.password === validatePassword) {
          console.log('Bristooooles!');
        }
      }).catch(function(error) {
        console.log(error);
      });
    };
  });
