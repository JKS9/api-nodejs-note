import {Request, Response, RequestHandler} from 'express';

import {INote} from '../../../types/typeSchema';
import Note from '../../../models/note.model';

const CreateNoteController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const note: INote = await Note.create({
      note: req.body.data.note,
      date: req.body.data.date,
      checked: req.body.data.checked,
      userId: req.body.user._id,
    });

    await note.save();

    return res.status(200).json({
      message: 'created',
      note: note,
    });
  } catch (e) {
    console.log('error Create Note', e);
    return res.status(500);
  }
};

export default CreateNoteController;
