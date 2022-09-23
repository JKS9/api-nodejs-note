import {Request, Response, RequestHandler, NextFunction} from 'express';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyRefreshToken: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const schema = Joi.object({
    _refreshToken: Joi.string().required().label('Refresh Token'),
  });

  const {error} = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({error: true, message: error.details[0].message});

  const data = {
    refreshToken: req.body._refreshToken,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyRefreshToken;
