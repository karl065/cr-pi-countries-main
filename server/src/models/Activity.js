const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5],
      },
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
    },
    temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false,
    },
  });
};
