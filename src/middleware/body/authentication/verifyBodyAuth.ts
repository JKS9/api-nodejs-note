import {Request, Response, RequestHandler, NextFunction} from 'express';
import passwordComplexity from 'joi-password-complexity';
import Joi from 'joi';

/**
 * Verify Body Create
 */
const VerifyBodyAuth: RequestHandler = (req: Request, res: Response, next) => {
  const schema = Joi.object({
    _email: Joi.string().email().required().label('email'),
    _password: passwordComplexity().required().label('password'),
  });

  const {error} = schema.validate(req.body);
  if (error) return res.status(400).json({message: error.details[0].message});

  const data = {
    email: req.body._email,
    password: req.body._password,
  };

  req.body.data = data;

  return next();
};

export default VerifyBodyAuth;
