import {Request, Response, RequestHandler} from 'express';

import {IUpdateNote} from '../../../types/typeSchema';
import Note from '../../../models/note.model';

const UpdatedNoteController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const note: IUpdateNote | null = await Note.findOneAndUpdate(
      {_id: req.body.data.id, userId: req.body.user._id},
      {$set: {note: req.body.data.note}},
      {returnNewDocument: true}
    );

    if (note) {
      await note.save();

      return res.status(200).json({
        message: 'update',
        note: note,
      });
    }

    return res.status(500).json({
      message: 'Not found note',
    });
  } catch (e) {
    console.log('error Update Note', e);
    return res.status(500).json({
      message: 'error',
    });
  }
};

export default UpdatedNoteController;
