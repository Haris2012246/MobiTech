const { hashPassword } = require("../utils/password-hash");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  });

  // hash the password before saving
  Users.beforeCreate(async (user, options) => {
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Products, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
