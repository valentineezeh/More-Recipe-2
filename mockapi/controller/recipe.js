import recipes from '../model/recipe';
/**
 * @class Recipe
 * @classdesc controller class for recipes
 */
class Recipe {
  /**
   *@returns {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static getallRecipe(req, res) {
    return res.json({
      allRecipe: recipes
    });
  }
  /**
   * @return {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static createRecipe(req, res) {
    recipes.push({
      id: recipes.length + 1,
      upvotes: 0,
      downvotes: 0,
      favorite: 0,
      views: 0,
      title: req.body.title,
      duration: req.body.duration,
      image: req.body.image,
      ingredients: req.body.ingredients,
      procedures: req.body.procedures,
    });
    return res.status(201).json({
      message: 'recipe has successfully been created',
      id: recipes.length + 1,
      upvotes: 0,
      downvotes: 0,
      favorite: 0,
      views: 0,
      title: req.body.title,
      duration: req.body.duration,
      image: req.body.image,
      ingredients: req.body.ingredients,
      procedures: req.body.procedures,
    });
  }
  /**
   * @returns {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static updateRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes[i].title = req.body.title;
        recipes[i].duration = req.body.duration;
        recipes[i].image = req.body.image;
        recipes[i].ingredients = req.body.ingredients;
        recipes[i].procedures = [req.body.procedures];
        return res.status(201).json({
          recipes,
          message: 'recipe has successfuly been updated',
        });
      }
    }
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  /**
   * @returns {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static deleteRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes.splice(i, 1);
        return res.status(201).json({
          message: 'success',
        });
      }
    }
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  /**
   * @returns {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static retrieveRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        return res.status(201).json({
          recipes: recipes[i],
          message: 'success',
        });
      }
    }
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  /**
   * @returns {object} recipes
   * @param {*} req
   * @param {*} res
   */
  static addReview(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        console.log(recipes);
        recipes[i].reviews.push(req.body.reviews);
        return res.status(201).json({
          recipes,
          message: 'success! your review has been added.',
        });
      }
    }
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
}


export default Recipe;
