import {Request, Response, RequestHandler} from 'express';

import {IChecked} from '../../../types/typeSchema';
import Note from '../../../models/note.model';

const CheckedNoteController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const checked: IChecked | null = await Note.findOneAndUpdate(
      {_id: req.body.data.id, userId: req.body.user._id},
      {$set: {checked: req.body.data.checked}},
      {returnNewDocument: true}
    );

    if (checked === null) {
      return res.status(500).json({
        message: 'error',
      });
    }

    await checked?.save();

    return res.status(200).json({
      message: 'checked',
    });
  } catch (e) {
    console.log('error Update Note', e);
    return res.status(500).json({
      message: 'error',
    });
  }
};

export default CheckedNoteController;
