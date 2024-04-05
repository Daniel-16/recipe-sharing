import UserModel from "../models/UserModel.js";
// import RecipeModel from "../models/RecipeModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import NewsLetterModel from "../models/NewsletterModel.js";

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created user.
 */
export const createUser = async (req, res) => {
  // Data from the request body
  const { username, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 6 characters long",
    });
  }
  try {
    const user = await UserModel.create({
      username,
      email,
      password,
    });
    const token = generateToken({ userId: user._id });
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Signs in a new user
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Signed in user
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find user from db if they exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }
    //Match passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }
    const token = generateToken({ userId: user._id });
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Subscribe to news letter or updates
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Subscribed user
 */
export const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await NewsLetterModel.create({ email });
    res.status(200).json({
      message: `User subscribed successfully ${user.email}`,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
