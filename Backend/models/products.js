module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modelName: {  
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
     isFeaturedAd: {
      type: DataTypes.BOOLEAN,
     defaultValue: false, 
    },

    imageUri: {
      type: DataTypes.STRING
    }

  });

  Products.associate = (models) => {
    Products.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Products;
};
