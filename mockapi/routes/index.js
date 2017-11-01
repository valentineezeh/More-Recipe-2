
import Recipe from '../controller/recipe';

export default (app) => {
  app.get('/api/recipes', Recipe.getallRecipe);
  app.post('/api/recipes', Recipe.createRecipe);
  app.put('/api/recipes/:recipeId', Recipe.updateRecipe);
  app.delete('/api/recipes/:recipeId', Recipe.deleteRecipe);
  app.get('/api/recipes/:recipeId', Recipe.retrieveRecipe);
  app.post('/api/recipes/:recipeId/reviews', Recipe.addReview);
};
