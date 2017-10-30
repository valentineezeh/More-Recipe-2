module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipes',
    });
  };

  return user;
};
