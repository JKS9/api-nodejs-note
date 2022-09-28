import mongoose from 'mongoose';
import supertest from 'supertest';

import App from '../app';

import Users from '../models/user.model';
import Notes from '../models/note.model';
import 'dotenv/config';

const dbUrl = process.env.MONGODB_URL as string;

const dataUser = {
  _email: 'testAdmin@gmail.com',
  _password: 'Juzans123*',
};

const note = {
  _note: 'Note 1',
  _date: '2022-09-27',
  _checked: false,
};

beforeAll(() => {
  return mongoose.connect(dbUrl);
});

test('GET /', async () => {
  await supertest(App)
    .get('/')
    .expect(200)
    .then((response) => {
      expect(response.body.name).toBe('note');
      expect(response.body.version).toBe(0.1);
    });
});

describe('Authentication', () => {
  test('POST /auth/signup', async () => {
    await supertest(App)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        expect(response.body.message).toBe('User create');

        const user = await Users.findOne({email: 'testAdmin@gmail.com'});
        expect(user).toBeTruthy();
        expect(user?.email).toBe('testAdmin@gmail.com');
      });
    //.catch((err) => console.log('err 1', err));
  });

  test('POST /auth/login', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        expect(response.body.accessToken);
        expect(response.body.refreshToken);
        expect(response.body.message).toBe('Logged in sucessfully');
      });
    //.catch((err) => console.log('err 2', err));
  });

  test('POST /auth/refreshtoken', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/auth/refreshtoken')
          .set('Accept', 'application/json')
          .send({
            _refreshToken: res.body.refreshToken,
          })
          .expect('Content-Type', /json/)
          .then(async (response) => {
            expect(response.body.accessToken);
          });
        //.catch((err) => console.log('err 4', err));
      });
    //.catch((err) => console.log('err 3', err));
  });
});

describe('Notes', () => {
  test('POST /api/adding', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/api/adding')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(note)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.message).toBe('created');

            const note = await Notes.findOne({_id: response.body.note._id});
            expect(note).toBeTruthy();
            expect(note?.note).toBe('Note 1');
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });

  test('POST /api/checked', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/api/adding')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(note)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (resp) => {
            expect(resp.body.note._id);

            await supertest(App)
              .post('/api/checked')
              .set('Accept', 'application/json')
              .set('Authorization', `Bearer ${res.body.accessToken}`)
              .send({
                _id: resp.body.note._id,
                _checked: true,
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .then(async (response) => {
                expect(response.body.message).toBe('checked');
              });
            //.catch((err) => console.log('err 7', err));
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });

  test('POST /api/update', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/api/adding')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(note)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (resp) => {
            expect(resp.body.note._id);

            await supertest(App)
              .post('/api/update')
              .set('Accept', 'application/json')
              .set('Authorization', `Bearer ${res.body.accessToken}`)
              .send({
                _id: resp.body.note._id,
                _note: 'new note',
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .then(async (response) => {
                expect(response.body.message).toBe('update');
                expect(response.body.note._id).toBe(resp.body.note._id);
              });
            //.catch((err) => console.log('err 7', err));
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });

  test('DELETE /api/delete', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/api/adding')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(note)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (resp) => {
            expect(resp.body.note._id);

            await supertest(App)
              .delete('/api/delete')
              .set('Accept', 'application/json')
              .set('Authorization', `Bearer ${res.body.accessToken}`)
              .send({
                _id: resp.body.note._id,
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .then(async (response) => {
                expect(response.body.message).toBe('delete');
              });
            //.catch((err) => console.log('err 7', err));
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });

  test('GET /api/find', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .get('/api/find')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(Array.isArray(response.body.notes)).toBeTruthy();
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });
});

describe('End Test', () => {
  test('POST /api/auth/logout', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .post('/api/auth/logout')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({
            _refreshToken: res.body.refreshToken,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.message).toBe('Logged Out Sucessfully');
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });

  test('POST /api/auth/delete', async () => {
    await supertest(App)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(dataUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        expect(res.body.accessToken);
        expect(res.body.refreshToken);
        expect(res.body.message).toBe('Logged in sucessfully');

        await supertest(App)
          .delete('/api/auth/delete')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.message).toBe('delete');
          });
        //.catch((err) => console.log('err 6', err));
      });
    //.catch((err) => console.log('err 5', err));
  });
});
