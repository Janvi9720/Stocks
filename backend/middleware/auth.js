import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";
import User from "../models/user.js";

dotenv.config();

export const jwtCheck = auth({
  audience: [
    process.env.REACT_APP_AUTH0_AUDIENCE,
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
  ],
  issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});

export const jwtParse = async(req, res, next) => {
  const { authorization } = req.headers
  
  if(!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401)
  }

  const token = authorization.split(" ")[1]
     
  try {
      const decoded = jwt.decode(token)
      const auth0Id = decoded.sub

      const user = await User.findOne({ auth0Id: auth0Id })

      if(!user) {
          return res.sendStatus(401)
      }

      req.auth0Id =auth0Id
      req.userId = user._id.toString()
      next()

  } catch(error) {
      return res.sendStatus(401)
  }
}

