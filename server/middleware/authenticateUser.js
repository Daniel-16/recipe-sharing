import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

/**
 * Middleware function to authenticate user using JWT token.
 * Checks the authorization header for a JWT token, verifies it, and attaches the authenticated user to the request object.
 * If the token is valid, proceeds to the next middleware function. Otherwise, returns a 401 error response.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the request-response cycle.
 * @returns {void} - Does not return a value directly, but may modify the request object or send a response.
 */
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decodedToken.userId);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      error: "Authorization header is required",
    });
  }
};
