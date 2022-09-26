import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserToken from '../../models/userToken.model';

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
const REFRESH_TOKEN_PRIVATE_KEY = process.env
  .REFRESH_TOKEN_PRIVATE_KEY as string;

const generateTokens = async (user: any) => {
  try {
    const payload = {_id: user._id};

    const accessToken: string = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: '14m',
    });
    const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: '30d',
    });

    const userToken = await UserToken.findOne({userId: user._id});
    if (userToken) await userToken.remove();

    await new UserToken({userId: user._id, refreshToken: refreshToken}).save();
    return Promise.resolve({accessToken, refreshToken});
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
