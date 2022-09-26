import {Request, Response, RequestHandler, NextFunction} from 'express';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyId: RequestHandler = (req: Request, res: Response, next) => {
  const schema = Joi.object({
    _id: Joi.string().required().label('_id'),
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

  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  if (!checkForHexRegExp.test(req.body._id)) {
    return res.status(404).json({message: 'Wrong request Body value id'});
  }

  const data: {
    id: string;
  } = {
    id: req.body._id,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyId;
