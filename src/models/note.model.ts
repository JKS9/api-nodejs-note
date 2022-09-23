import {model, Schema} from 'mongoose';
import {INote} from '../types/typeSchema';

const NoteSchema: Schema = new Schema({
  note: {type: String, required: true},
  date: {type: String, required: true},
  checked: {type: Boolean, required: true},
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
});

export default model<INote>('Note', NoteSchema);
