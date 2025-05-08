import express from "express";
import { getMe, login } from "../controllers/kubios-auth-controller.js";
import { adminLogin } from "../controllers/auth-controller.js";
import { authenticateToken } from "../middlewares/authentication.js";

const authRouter = express.Router();

/**
 * @api {get} /api/auth/ping Ping the server
 * @apiName Ping
 * @apiGroup Test
 *
 * @apiSuccess {String} message The server response message.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "pong"
 *     }
 */
authRouter.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

/**
 * @api {post} /api/auth/login User login
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiBody {String} username Username
 * @apiBody {String} password Password
 *
 * @apiExample {json} Request-Example:
 *  {
 *    "username": "myusername",
 *    "password": "mypassword"
 *  }
 *
 * @apiSuccess {String} message Result of the request
 * @apiSuccess {Object} user User details
 * @apiSuccess {Number} user.user_id User ID
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} user.email Email address
 * @apiSuccess {String} user.created_at Registration date
 * @apiSuccess {String} user.user_level User level
 * @apiSuccess {String} token Authentication token
 */
authRouter.post("/login", login);

/**
 * @api {post} /api/auth/admin_login Admin login
 * @apiName AdminLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiBody {String} username Admin username
 * @apiBody {String} password Admin password
 *
 * @apiExample {json} Request-Example:
 *  {
 *    "username": "admin",
 *    "password": "secret"
 *  }
 *
 * @apiSuccess {String} token Authentication token
 */
authRouter.post("/admin_login", adminLogin);

/**
 * @api {get} /api/auth/me Get current user info
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Number} user_id User ID
 * @apiSuccess {String} username Username
 * @apiSuccess {String} email Email address
 * @apiSuccess {Number} user_level_id User level
 * @apiSuccess {Number} iat Token issued-at timestamp
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 21,
 *       "username": "johnd",
 *       "email": "johnd@example.com",
 *       "user_level_id": 2,
 *       "iat": 1701279021
 *     }
 *
 * @apiError {String} message Invalid token
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
authRouter.get("/me", authenticateToken, getMe);

export default authRouter;
