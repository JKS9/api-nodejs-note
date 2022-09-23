import {Request, Response, RequestHandler} from 'express';
import bcrypt from 'bcrypt';

import GenerateTokens from '../../utils/token/generateToken';

const LoginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const verifiedPassword = await bcrypt.compare(
      req.body.data.password,
      req.body.user.password
    );

    if (!verifiedPassword) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const {accessToken, refreshToken} = await GenerateTokens(req.body.user);

    return res.status(200).json({
      accessToken,
      refreshToken,
      message: 'Logged in sucessfully',
    });
  } catch (e) {
    console.log('error login User', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default LoginController;
