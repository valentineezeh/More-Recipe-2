import chai from 'chai';
import supertest from 'supertest';
// import validateFunction from '../validators/validateinput';
import app from '../../app';

const { expect } = chai.expect;
const request = supertest(app);
let data = {};
let updateData = {};
const upVote = '1';

describe('API Endpoints testing', () => {
  describe('Get all recipes in the application', () => {
    beforeEach(() => {
      data = {
        id: 1,
        title: 'Onion Stew',
        duration: '20 Minutes Meal',
        image: 'onionstew.jpg',
        ingredients: ['palm oil', 'goat meat', 'stockfish', 'water', 'seasoning'],
        procedures: ['boil stockfish', 'cut meat', 'Cook meat', 'add season'],
        upVote: 0,
        downVote: 0,
        favorite: 0,
        reviews: [
          {
            review: '',
          },
        ],
      };
      updateData = {
        title: 'Onion Stew',
        duration: '20 Minutes Meal',
        image: 'onionstew.jpg',
        ingredients: ['palm oil', 'goat meat', 'stockfish', 'water', 'seasoning'],
        procedures: ['boil stockfish', 'cut meat', 'Cook meat', 'add season'],
      };
    });
    it('Should get  all the recipes in the application', () => {
      request.get('/api/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.an('object');
        });
    });
    it('Should create new recipe in the application', () => {
      request.post('/api/recipes')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should update the current recipe in the application', () => {
      request.put('/api/recipes/:recipeId')
        .send(updateData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should delete the recipe in the application', () => {
      request.delete('/api/recipes/:recipeId')
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('Should upvote the current recipe', () => {
      request.post('/api/recipes/:recipeId/')
        .send(upVote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
  });
});
