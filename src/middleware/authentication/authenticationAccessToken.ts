import {Request, Response, RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;

import Users from '../../models/user.model';
import UserToken from '../../models/userToken.model';

const AuthenticationAccessToken: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let users: any;

  if (token == null) return res.status(401).json({message: 'Token invalid'});

  jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.status(401).json({message: 'Token invalid'});
    }
    users = user;
  });

  const verifyUser = await Users.findOne({_id: users._id});
  if (!verifyUser) {
    return res.status(401).json({message: 'Token invalid'});
  }

  const verifyUserToken = await UserToken.findOne({userId: users._id});
  if (!verifyUserToken) {
    return res.status(401).json({message: 'Token invalid'});
  }

  req.body.user = users;
  next();
};

export default AuthenticationAccessToken;
