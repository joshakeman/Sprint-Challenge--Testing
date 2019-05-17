const request = require('supertest');
const Games = require('../games/gamesModel');


const server = require('./server.js');

describe('server', () => {

  // open client, make a request and inspect the response
  describe('GET /', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get('/')
        .expect(200);
    });

    it('should return 422 for POst missing content', async () => {
        //no object sent
        const res = await request(server).post('/games');
        expect(res.status).toBe(422);
      });

      it('should return 200 for POst with content', async () => {
        //no object sent
        const res = await request(server).post('/games', {"title": "Mario", "genre": "genre"});
        expect(res.status).toBe(200);
      });

    it('using the squad (async/await)', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    

    it('should return JSON using done callback', done => {
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toBe('application/json'); // Content-Type
          done();
        });
    });

    it('should return { api: "up" }', () => {
      const expected = { api: 'up' };
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });

    it('should return an array of games', () => {
        // const expected = { api: 'up' };
        return request(server)
          .get('/games')
          .then(res => {
            expect(res.body).toBeInstanceOf(Array);
          });
      });
  });
});