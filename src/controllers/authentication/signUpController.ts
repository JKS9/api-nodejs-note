import {Request, Response, RequestHandler} from 'express';
import bcrypt from 'bcrypt';

import Users from '../../models/user.model';
import 'dotenv/config';

const salty: number = Number(process.env.SALT);

const SignUpController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const salt: string = await bcrypt.genSalt(salty);
    const hashPassword: string = await bcrypt.hash(
      req.body.data.password,
      salt
    );

    await new Users({
      email: req.body.data.email,
      password: hashPassword,
    }).save();

    return res.status(200).json({
      message: 'User create',
    });
  } catch (e) {
    console.log('error signup User', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default SignUpController;
