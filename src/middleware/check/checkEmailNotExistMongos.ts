import {Request, Response, RequestHandler} from 'express';

import Users from '../../models/user.model';

const CheckEmailNotExistMongos: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const user = await Users.findOne({email: req.body.data.email});

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    req.body.user = user;

    next();
  } catch (e) {
    console.log('error find Note', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default CheckEmailNotExistMongos;
