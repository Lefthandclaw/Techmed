import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { selectUserByUsername } from "../models/user-model.js";
import { customError } from "../middlewares/error-handler.js";

// user authentication (login)
const login = async (req, res, next) => {
  console.log(`Login:\n ${req.body.username}`);
  const { username, password } = req.body;
  if (!username) {
    return next(customError("Username missing.", 400));
    //return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByUsername(username);
  // jos käyttäjä löytyi tietokannasta verrataan kirjautumiseen syötettyä sanaa tietokannan
  // salasanatiivisteeseen
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // ennen tokenin generointia ja
      // käyttäjätietojen lähettämistä vastauksessa,
      // poistetaan salasana niistä
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({ message: "login ok", user, token });
    }
  }
  //res.status(401).json({message: 'Bad username/password.'});
  next(customError("Bad username/password.", 401));
};

const getMe = (req, res) => {
  const user = req.user;
  res.json(user);
};

const adminLogin = async (req, res, next) => {
  console.log(`Admin login:\n ${req.body.username}`);
  const { username, password } = req.body;
  if (!username) {
    return next(customError("Username missing.", 400));
  }
  const user = await selectUserByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      if (user.user_level === "admin") {
        delete user.password;
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return res.json({ message: "login ok", user, token });
      }
    }
  }
  next(customError("Bad username/password.", 401));
};

export { login, getMe, adminLogin };
