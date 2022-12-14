import {Request, Response, RequestHandler, NextFunction} from 'express';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyCreate: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const schema = Joi.object({
    _note: Joi.string().required().label('_note'),
    _date: Joi.string().required().label('_date'),
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

  const data: {
    note: string;
    date: string;
    checked: boolean;
  } = {
    note: req.body._note,
    date: req.body._date,
    checked: req.body._checked,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyCreate;
