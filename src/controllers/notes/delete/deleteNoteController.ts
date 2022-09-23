import {Request, Response, RequestHandler} from 'express';

import Note from '../../../models/note.model';

const DeleteNoteController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await Note.deleteOne({
      _id: req.body.data.id,
      userId: req.body.user._id,
    });

    return res.status(200).json({
      message: 'delete',
    });
  } catch (e) {
    console.log('error Delte Note', e);
    return res.status(500).json({
      message: 'error',
    });
  }
};

export default DeleteNoteController;
