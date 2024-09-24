// Importing the jsonwebtoken package to handle JWT (JSON Web Tokens).
import jwt from 'jsonwebtoken'; 

// Importing the User model to retrieve user data from the database.
import { User } from '../models/user.models.js';

// Middleware function to check if the user is authenticated.
export const isAuth = async (req, res, next) => {
    try {
        // Getting the token from the request headers.
        const token = req.headers.token;

        // If no token is provided, respond with a 403 status code and an error message.
        if (!token) {
            return res.status(403).json({
                message: "Please Login "
            });
        }

        // Verifying the token using the JWT secret stored in environment variables.
        const decodedData = jwt.verify(token, process.env.jwt_sec);

        // Fetching the user from the database using the decoded user ID from the token.
        req.user = await User.findById(decodedData._id);

        // If the token is valid and the user exists, proceed to the next middleware or route.
        next();
    } catch (error) {
        // If an error occurs (e.g., invalid token), respond with a 500 status code and an error message.
        res.status(500).json({
            message: "Login First"
        });
    }
};

// Middleware function to check if the authenticated user has admin privileges.
export const isAdmin = (req, res, next) => {
    try {
        // Checking if the user's role is not 'admin'.
        if (req.user.role !== 'admin') {
            // If the user is not an admin, respond with a 403 status code and an error message.
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        // If the user is an admin, proceed to the next middleware or route.
        next();
    } catch (error) {
        // If an error occurs, respond with a 500 status code and the error message.
        res.status(500).json({
            message: error.message
        });
    }
};
