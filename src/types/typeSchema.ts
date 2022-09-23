import {Document} from 'mongoose';

export interface INote extends Document {
  note: string;
  date: string;
  checked: boolean;
  userId: string;
}

export interface IChecked extends Document {
  id: string;
  userId: string;
  checked: boolean;
}

export interface IUpdateNote extends Document {
  id: string;
  userId: string;
  note: string;
}

export interface IUsers extends Document {
  email: string;
  password: string;
  dateCreate: Date;
}

export interface IUsersToken extends Document {
  userId: string;
  token: string;
  dateCreate: Date;
}
