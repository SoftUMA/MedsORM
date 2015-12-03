var Sequelize = require('sequelize');

var sequelize = new Sequelize('database.db', null, null, {
    dialect: 'sqlite',
    storage: 'database.db'
});

// ================================

var Pantalla = sequelize.define('tPantalla', {
    pantalla: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ================================

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

// ================================

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

// ================================

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

// ================================

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

// ================================

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

// ================================

Laboratorio.findAll({
    where: {
        ID_LABORATORIO:'5'
    },
    include: [{
        model: Medicamento
    }]
}).then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.log(error);
});

//*
/*
Usuario.findAll().then(function(result) {
    for (var i = 0; i < result.length; i++) {
        console.log('Usuario ' + i + ':');
        console.log('Nombre: ' + result[i].dataValues.nombre);
        console.log('Password: ' + result[i].dataValues.password);
        console.log('Rol: ' + result[i].dataValues.rolName);
        console.log('');
    }
}).catch(function(error) {
    console.log(error);
});
*/
/*/

Laboratorio.findAll({
    where: {
        ID_LABORATORIO: '5'
    }
}).then(function (result) {
    console.log('Laboratorio: ' + result[0].NOMBRE_LABORATORIO);

    Medicamento.findAll({
        where: {
            LABORATORIO: '5'
        }
    }).then(function (result) {
        console.log('Medicamentos del laboratorio:');

        for (var i = 0; i < result.length; i++) {
            console.log('\t- ' + result[i].NOMBRE_MEDICAMENTO);
        }
    }).catch(function (error) {
        console.log(error);
    });
}).catch(function(error) {
    console.log(error);
});
//*/
