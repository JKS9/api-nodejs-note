import {model, Schema} from 'mongoose';

import {IUsersToken} from '../types/typeSchema';

const UsersTokenShema: Schema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
  refreshToken: {type: String, required: true},
  createdAt: {type: Date, default: Date.now, expires: 30 * 86400},
});

export default model<IUsersToken>('Users_Token', UsersTokenShema);
