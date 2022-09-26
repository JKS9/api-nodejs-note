import express, {Router} from 'express';

/**
 * Controllers
 */
import StatusController from '../controllers/notes/reade/statusController';

import SignUpController from '../controllers/authentication/signUpController';
import LoginController from '../controllers/authentication/loginController';
import RefreshTokenController from '../controllers/authentication/refreshTokenController';
import LogoutController from '../controllers/authentication/logoutController';

import AuthDeleteUserdata from '../controllers/users/delete/authDeleteUserData';

import FindNoteController from '../controllers/notes/reade/findNoteController';
import CreateNoteController from '../controllers/notes/create/createNoteController';
import CheckedNoteController from '../controllers/notes/update/checkedNoteController';
import UpdatedNoteController from '../controllers/notes/update/updatedNoteController';
import DeleteNoteController from '../controllers/notes/delete/deleteNoteController';

/**
 * MiddelWare
 */
import VerifyBodyAuth from '../middleware/body/authentication/verifyBodyAuth';
import VerifyRefreshToken from '../middleware/body/token/verifyBodyRefreshToken';
import VerifyBodyLogOut from '../middleware/body/authentication/verifyBodyLogOut';

import VerifyBodyCreate from '../middleware/body/verifyBodyCreate';
import VerifyBodyChecked from '../middleware/body/verifyBodyChecked';
import VerifyBodyUpdate from '../middleware/body/verifyBodyUpdate';
import VerifyBodyId from '../middleware/body/verifyBodyId';

/**
 * MiddelWare
 * Mongose
 */
import CheckEmailExistMongos from '../middleware/check/checkEmailExistMongos';
import CheckEmailNotExistMongos from '../middleware/check/checkEmailNotExistMongos';

const root: Router = express.Router();

root.get('/', StatusController);

/**
 * AUTHENTICATION USER
 */
root.post(
  '/auth/signup',
  VerifyBodyAuth,
  CheckEmailExistMongos,
  SignUpController
);
root.post(
  '/auth/login',
  VerifyBodyAuth,
  CheckEmailNotExistMongos,
  LoginController
);
root.post('/auth/refreshtoken', VerifyRefreshToken, RefreshTokenController);
root.post('/api/auth/logout', VerifyBodyLogOut, LogoutController);

/**
 * USER DELETE
 */
root.delete('/api/auth/delete', AuthDeleteUserdata);

/**
 * NOTE GET
 */
root.get('/api/find', FindNoteController);

/**
 * NOTE POST
 */
root.post('/api/adding', VerifyBodyCreate, CreateNoteController);
root.post('/api/checked', VerifyBodyChecked, CheckedNoteController);
root.post('/api/update', VerifyBodyUpdate, UpdatedNoteController);

/**
 * NOTE DELETE
 */
root.delete('/api/delete', VerifyBodyId, DeleteNoteController);

export default root;
