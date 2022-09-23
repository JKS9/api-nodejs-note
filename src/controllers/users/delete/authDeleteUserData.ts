import {Request, Response, RequestHandler} from 'express';

import Note from '../../../models/note.model';
import Users from '../../../models/user.model';
import UserToken from '../../../models/userToken.model';

const AuthDeleteUserdata: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await Note.deleteMany({userId: req.body.user._id});

    await UserToken.deleteMany({userId: req.body.user._id});

    await Users.deleteMany({_id: req.body.user._id});

    return res.status(200).json({
      message: 'delete',
    });
  } catch (e) {
    console.log('error delete', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default AuthDeleteUserdata;
