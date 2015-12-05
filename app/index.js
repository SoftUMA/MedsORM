"use strict";

// ================================================================
// > Requires

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sequelize = require('sequelize');

// ================================================================
// > Initialize ORM engine

var sequelize = new Sequelize('database.db', null, null, {
    dialect: 'sqlite',
    storage: 'data/database.db'
});

// ================================================================
// > Set HTTP/GET response

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bower_components/bootstrap/dist/css/bootstrap.css', function(req, res) {
  res.sendFile(__dirname + '/bower_components/bootstrap/dist/css/bootstrap.css');
});

app.get('/styles/main.css', function(req, res) {
  res.sendFile(__dirname + '/styles/main.css');
});

app.get('/bower_components/jquery/dist/jquery.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/jquery/dist/jquery.js');
});

app.get('/bower_components/angular/angular.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular/angular.js');
});

app.get('/bower_components/bootstrap/dist/js/bootstrap.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/bootstrap/dist/js/bootstrap.js');
});

app.get('/bower_components/angular-animate/angular-animate.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-animate/angular-animate.js');
});

app.get('/bower_components/angular-cookies/angular-cookies.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-cookies/angular-cookies.js');
});

app.get('/bower_components/angular-resource/angular-resource.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-resource/angular-resource.js');
});

app.get('/bower_components/angular-route/angular-route.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-route/angular-route.js');
});

app.get('/bower_components/angular-sanitize/angular-sanitize.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-sanitize/angular-sanitize.js');
});

app.get('/socket.io.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/socket.io-client/socket.io.js');
});

app.get('/scripts/app.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/app.js');
});

app.get('/scripts/controllers/main.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/controllers/main.js');
});

app.get('/scripts/controllers/login.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/controllers/login.js');
});

app.get('/bower_components/angular-touch/angular-touch.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-touch/angular-touch.js');
});

app.get('/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', function(req, res) {
  res.sendFile(__dirname + '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2');
});

app.get('/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', function(req, res) {
  res.sendFile(__dirname + '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff');
});

app.get('/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', function(req, res) {
  res.sendFile(__dirname + '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf');
});

app.get('/views/login.html', function(req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/views/main.html', function(req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

/*
app.get('', function(req, res) {
  res.sendFile(__dirname + '');
});
*/

// ================================================================
// > Define server behavior

var totalUsers = 0;

io.on('connection', function(socket) {
  totalUsers++;
  console.log('>>> user connected, total users: ' + totalUsers);

  socket.on('disconnect', function() {
    totalUsers--;
    console.log('>>> user disconnected, total users: ' + totalUsers);
  });

  socket.on('login', function(msg) {
    console.log(msg);

    Usuario.findAll({
      where: {
        nombre: msg.testUser
      }
    }).then(function(result) {
      if (result[0].dataValues.password === msg.testPass) {
        io.emit('redirect', '/#/main');
      }
    }).catch(function(error) {
      console.log(error);
      io.emit('error', 'invalid login !');
    });
  });

  socket.on('loadMeds', function(msg) {
    console.log(msg);

    Medicamento.findAll().then(function(result) {
      console.log(result);
      io.emit('medsResponse', result);
    }).catch(function(error) {
      console.log(error);
      io.emit('error', 'No se ha podido cargar la lista de medicamentos')
    });
  });
});

// ================================================================
// > Start HTTP server

http.listen(9876, function() {
  console.log('>>> listening on localhost:9876');
});

// ================================================================
// > ORM model definition

// ================================================================
// > tPantalla

var Pantalla = sequelize.define('tPantalla', {
    pantalla: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================================================
// > tRol

var Rol = sequelize.define('tRol', {
    rolName: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    rolDes: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================================================
// > tPermiso

var Permiso = sequelize.define('tPermiso', {
    rolName: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
            model: Rol,
            key: 'rolName'
        }
    },
    pantalla: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
            model: Pantalla,
            key: 'pantalla'
        }
    },
    acceso: {
        type: Sequelize.BOOLEAN
    },
    modificacion: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================================================
// > tUsuario

var Usuario = sequelize.define('tUsuario', {
    nombre: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING
    },
    rolName: {
        type: Sequelize.STRING,
        references: {
            model: Rol,
            key: 'rolName'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================================================
// > tLaboratorio

var Laboratorio = sequelize.define('tLaboratorio', {
    ID_LABORATORIO: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    NOMBRE_LABORATORIO: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================================================
// > tMedicamento

var Medicamento = sequelize.define('tMedicamento', {
    ID_MEDICAMENTO: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    NOMBRE_MEDICAMENTO: {
        type: Sequelize.STRING
    },
    CANTIDAD_DISPONIBLE: {
        type: Sequelize.INTEGER
    },
    LABORATORIO: {
        type: Sequelize.INTEGER,
        references: {
            model: Laboratorio,
            key: 'ID_LABORATORIO'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Laboratorio.hasMany(Medicamento, { foreignKey: 'LABORATORIO' });
