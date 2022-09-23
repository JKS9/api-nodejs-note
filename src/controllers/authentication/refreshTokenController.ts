import {Request, Response, RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import VerifyRefreshToken from '../../middleware/token/verifyRefreshToken';
const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;

const RefreshTokenController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken: any = await VerifyRefreshToken(
      req.body.data.refreshToken
    );

    const payload = {_id: refreshToken.tokenDetails._id};

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: '14m',
    });

    res.status(200).json({
      accessToken,
    });
  } catch (e) {
    console.log('error refresh Token', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default RefreshTokenController;
