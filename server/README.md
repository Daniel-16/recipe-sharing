# Recipe Sharing App API

This is a simple recipe sharing application api built with Node.js, Express, and MongoDB. Users can create an account, and then create and manage their own recipes.

## Prerequisites

- Node.js (v12 or later)
- MongoDB (v4 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Daniel-16/share-recipe.git
   ```
2. Navigate to the project directory:
   ```
   cd server
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Setup

1. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   MONGODB_DEV=mongodb://localhost:27017/recipe-sharing
   JWT_SECRET=create-your-own-secret
   ```

2. Start the development server
   ```
   npm run dev
   ```
   The server would run on `http://localhost:7000`

## API Endpoints

### User

- `POST /api/signup`: Register a new user.
  - Required fields: `username`, `email`, `password`
- `POST /api/login`: Log in a registered user
  - Required fields: `email`, `password`

<!-- - `POST /api/users/login`: Authenticate a user and obtain a JWT token.
  - Required fields: `email`, `password` -->

### Recipe

- `POST /api/createRecipe/`: Create a new recipe.

  - Required fields: `title`, `imageUrl`, `timeFrame`, `instructions`.
  - This endpoint requires authentication (JWT token in the `Authorization` header).

- `GET /api/recipes`: Retrieve all recipes created.
  <!-- - This endpoint requires authentication (JWT token in the `Authorization` header). -->
- `PUT /api/recipes/:recipeId/upvote`: Upvote a recipe.

  - Replace `/:recipeId` with the created recipe's id.
  - This endpoint requires authentication (JWT token in the `Authorization` header).

- `GET /api/recipes/:recipeId/votes`: Retrieves all the votes from a recipe
  - Replace `/:recipeId` with the created recipe's id.
- `POST /api/subscribe`: Subscribe to email newsletters and updates
  - Required fields: `email`
- `GET /api/userRecipes`: Get recipes of an authenticated user
  - This endpoint requires authentication (JWT token in the `Authorization` header).

<!-- ## User Schema

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}); -->

## Contributing

Contributions are definitely welcome!

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to [open an issue](https://github.com/Daniel-16/share-recipe/issues/new/choose) or contact me through my [email](mailto:danieloloruntoba681@gmail.com).
