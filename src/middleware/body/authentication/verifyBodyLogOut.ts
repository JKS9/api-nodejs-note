import {Request, Response, RequestHandler, NextFunction} from 'express';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyLogOut: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const schema = Joi.object({
    _refreshToken: Joi.string().required().label('Refresh Token'),
    user: Joi.object().keys({
      _id: Joi.string().required().label('_id'),
      iat: Joi.number().required().label('iat'),
      exp: Joi.number().required().label('exp'),
    }),
  });

  const {error} = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({error: true, message: error.details[0].message});

  const data: {
    refreshToken: string;
  } = {
    refreshToken: req.body._refreshToken,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyLogOut;
