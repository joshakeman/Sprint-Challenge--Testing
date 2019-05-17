const db = require('../data/dbConfig.js');
const Games = require('./gamesModel');

describe('games model', () => {
  afterEach(async () => {
    await db('games').truncate();
  });

  describe('insert()', () => {
    it('should add specified game', async () => {
      await Games.insert({ title: 'Mario Bros', genre: 'Platformer' });

      const games = await db('games');

      expect(games).toHaveLength(1);
    });

    it('should insert provided game', async () => {
      let game = await Games.insert({ title: 'Mario Bros', genre: 'Platformer' });
      expect(game.title).toBe('Mario Bros');

      game = await Games.insert({ title: 'Mortal Kombat', genre: 'Fighting' });
      expect(game.title).toBe('Mortal Kombat');

      const games = await db('games');

      expect(games).toHaveLength(2);
    });

    it('inserted game should have required fields', async () => {
        let game = await Games.insert({ title: 'Mario Bros' });

        expect(game).toHaveProperty('title')
        expect(game).toHaveProperty('genre')


    });   
  });
});