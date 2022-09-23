import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserToken from '../../models/userToken.model';

const VerifyRefreshToken = async (refreshToken: string) => {
  const ACCESS_TOKEN_PRIVATE_KEY = process.env
    .ACCESS_TOKEN_PRIVATE_KEY as string;

  return new Promise((resolve, reject) => {
    UserToken.findOne({token: refreshToken}, (err: any, doc: any) => {
      if (!doc) return reject({error: true, message: 'Invalid refresh token'});

      jwt.verify(
        refreshToken,
        ACCESS_TOKEN_PRIVATE_KEY,
        (err, tokenDetails) => {
          if (err)
            return reject({error: true, message: 'Invalid refresh token'});
          resolve({
            tokenDetails,
            error: false,
            message: 'Valid refresh token',
          });
        }
      );
    });
  });
};

export default VerifyRefreshToken;
