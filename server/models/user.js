'use strict';

const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  });

  User.prototype.validatePassword = async function validatePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.getJWT = async function getJWT() {
    const token = await jwt.sign({id: this.id}, process.env.TOKEN_KEY, {
      expiresIn: "24h"
    });
    return `Bearer ${token}`;
  };

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
