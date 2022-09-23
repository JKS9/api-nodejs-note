import {RequestHandler} from 'express';

/**
 * JSON 404 response
 */
const NotFound: RequestHandler = (req, res) => {
  return res.status(404).json({message: 'Not found'});
};

export default NotFound;
