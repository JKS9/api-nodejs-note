import {Request, Response, RequestHandler} from 'express';
import UserToken from '../../models/userToken.model';

const LogoutController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userToken = await UserToken.findOne({
      token: req.body.data.refreshToken,
    });
    if (!userToken)
      return res.status(200).json({message: 'Logged Out Sucessfully'});

    await userToken.remove();

    res.status(200).json({message: 'Logged Out Sucessfully'});
  } catch (e) {
    console.log('error logout', e);

    return res.status(500).json({
      message: 'error',
    });
  }
};

export default LogoutController;
