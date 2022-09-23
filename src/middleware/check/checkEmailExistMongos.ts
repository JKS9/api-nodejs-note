import {Request, Response, RequestHandler} from 'express';

import Users from '../../models/user.model';

const CheckEmailExistMongos: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const email = await Users.findOne({email: req.body.data.email});

    if (email) {
      return res.status(400).json({
        message: 'User with given email already exist',
      });
    }

    next();
  } catch (e) {
    console.log('error find Note', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default CheckEmailExistMongos;
