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


export default Recipe;
