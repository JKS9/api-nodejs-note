import {Request, Response, RequestHandler, NextFunction} from 'express';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyChecked: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const schema = Joi.object({
    _id: Joi.string().required().label('_id'),
    _checked: Joi.boolean().required().label('_checked'),
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
    return res.status(400).json({message: 'Wrong request Body value'});
  }

  const data: {
    id: string;
    checked: boolean;
  } = {
    id: req.body._id,
    checked: req.body._checked,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyChecked;
