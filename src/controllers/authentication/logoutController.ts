import {Request, Response, RequestHandler} from 'express';
import UserToken from '../../models/userToken.model';
import {IUsersToken} from '../../types/typeSchema';

const LogoutController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userToken: IUsersToken | null = await UserToken.findOne({
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
