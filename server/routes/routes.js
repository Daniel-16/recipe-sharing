import express from "express";
import {
  createUser,
  loginUser,
  subscribe,
} from "../controllers/UserController.js";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeVotes,
  getUserRecipes,
  upVoteRecipe,
} from "../controllers/RecipeController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
const router = express.Router();

/**
 * Route for user sign-up.
 * POST /api/signup
 * @name signup
 * @memberof router
 * @function
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post("/signup", createUser);

/**
 * Route for user log in
 * POST /api/login
 * @name login
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {callback} middleware
 */
router.post("/login", loginUser);

/**
 * Route for creating a recipe.
 * POST /api/createRecipe/:recipeOwnerId
 * @name createRecipe
 * @memberof router
 * @function
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 * @param {string} param - Recipe owner ID.
 */
router.post("/createRecipe/", authenticateUser, createRecipe);

/**
 * Route for getting all recipes
 * GET /api/recipes
 * @name getAllRecipes
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {callback} middleware
 */
router.get("/recipes", getAllRecipes);

/**
 * Route for upvoting a recipe
 * PUT /recipes/:recipeId/upvote
 * @name upVoteRecipe
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {function} middleware
 */
router.put("/recipes/:recipeId/upvote", authenticateUser, upVoteRecipe);

router.get("/recipes/:recipeId/votes", getRecipeVotes);

/**
 * Route for subscribing to updates
 * @name subscribe
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {function} middleware
 */
router.post("/subscribe", subscribe);

/**
 * Route for getting user's recipes
 * @name userRecipes
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {function} middleware
 */
router.get("/userRecipes", authenticateUser, getUserRecipes);

/**
 * Route for deleting a recipe
 * @name deleteRecipe
 * @memberof router
 * @function
 * @inner
 * @param {string} path
 * @param {function} middleware
 */
router.delete("/recipe/:recipeId/delete", authenticateUser, deleteRecipe);

export default router;
