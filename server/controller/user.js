import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';
// import dotenv from 'dotenv';

// dotenv.config();
const secret = "thelordismyhelperishallnotwant";


const User = db.User;
const Favorites = db.Favorites;
const error = {};


/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signUp = (req, res) => {
  console.log(req.body.fullname)
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      Message: 'Password Mismatch!',
    });
  }
  User
    .create({
      fullName: req.body.fullname,
      email: req.body.email,
      sex: req.body.sex,
      userName: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    })
    .then(user => res.status(201).json({
      user
    }))
    .catch((err) => {
      if (err.errors.message === 'userName must be unique') {
        error.err = { message: 'username already exists' };
      }
      if (err.errors.message === 'email must be unique') {
        error.err = { message: 'email already exists' };
      }
      if (err.errors.message === 'Enter a Valid Email') {
        error.err = { message: 'not an email' };
      }
      if (!error.err) {
        error.err = { message: err.errors[0].message };
      }
      res.status(400).json(error); // {error, data: req.body}
    });
};

/**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signIn = (req, res) => {
  if (!req.body.email || req.body.email.trim().length === 0) {
    return res.status(400).json({
      Message: 'Email Field should not be Empty',
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      Message: 'Password Field should not be Empty',
    });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if(!user) {
        return res.status(404).send({ message: 'Invalid Username or password' });
      }
      bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            return res.status(500).send({ error: err.message})
          }
          const token = jwt.sign({
                username: user.userName,
                userId: user.id
            }, secret, { expiresIn: '24h' });
            return res.status(200).send({
              message: `Welcome ${user.userName}`,
              token });

        });

    })
    .catch(error => res.status(500).send({ error: `an error occurred: ${error.message}`}));
};

/**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const addFavorites = (req, res) => {
  Favorites
    .findOrCreate({ where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID },
    defaults: { category: req.body.category } })
    .spread((favorite) => {
      res.status(201).send({
        favorite
      });
    })
    .catch(err => res.status(400).send({
<<<<<<< HEAD
=======
      message: err.parent.detail
>>>>>>> 73c676908c0910f478cbbcd581830950cc169020
    }));
};

/**
   * retrieveFavorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveFavorites = (req, res) => {
  Favorites
    .findOne({
      where: {
        userId: req.params.userID
      }
    })
    .then((recipe) => {
      if (recipe) {
        res.status(200).send({
          favoriteRecipe: recipe
        });
      } else {
        res.status(404).send({
          message: 'Record not Found!'
        });
      }
    })
    .catch(() => res.status(400).send({
      message: 'User not Found'
    }));
};


export default {
  signUp,
  signIn,
  addFavorites,
  retrieveFavorites,
  secret
};
