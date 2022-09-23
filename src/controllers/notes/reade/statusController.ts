import {RequestHandler} from 'express';

/**
 * Health check endpoint
 */
const StatusController: RequestHandler = (req, res) => {
  res.status(200).json({
    name: 'note',
    version: 0.1,
  });
};

export default StatusController;
