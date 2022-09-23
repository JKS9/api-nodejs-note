import {RequestHandler} from 'express';

import Note from '../../../models/note.model';

/**
 * Health check endpoint
 */
const FindNoteController: RequestHandler = async (req, res) => {
  let notes;

  try {
    notes = await Note.aggregate([
      {
        $match: {
          $expr: {
            $eq: ['$userId', {$toObjectId: req.body.user._id}],
          },
        },
      },
      {
        $group: {
          _id: '$date',
          value: {
            $push: {
              id: '$_id',
              note: '$note',
              date: '$date',
              checked: '$checked',
              userId: '$userId',
            },
          },
        },
      },
    ]).sort({_id: 1});
  } catch (e) {
    console.log('error find Note', e);
    return res.status(500).json({
      message: 'error',
    });
  }

  return res.status(200).json({
    notes: notes,
  });
};

export default FindNoteController;
