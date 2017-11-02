export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    }
  });
  // Favorites.associate = (models) => {
  //   // associations can be defined here
  //   Favorites.hasOne(models.Recipe, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
<<<<<<< HEAD

  // };
  return Favorites;
};

=======
    
  // };
  return Favorites;
};
>>>>>>> 73c676908c0910f478cbbcd581830950cc169020
