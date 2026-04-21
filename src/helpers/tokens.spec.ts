import { generateAccessToken, generateRefreshToken, hashToken } from './tokens';

describe('tokens', () => {
  describe('generateAccessToken', () => {
    it('deve receber um userId e retornar um accessToken válido', () => {
      const userId = '12345';
      const accessToken = generateAccessToken(userId);

      expect(typeof accessToken).toBe('string');
      expect(accessToken.split('.').length).toBe(3);
    });
  });
  describe('generateRefreshToken', () => {
    it('deve receber um userId e retornar um refreshToken válido', () => {
      const userId = '12345';
      const refreshToken = generateRefreshToken(userId);

      expect(typeof refreshToken).toBe('string');
      expect(refreshToken.split('.').length).toBe(3);
    });
  });
  describe('hashToken', () => {
    it('deve receber um token e retornar um hash válido', () => {
      const userId = '12345';
      const token = generateRefreshToken(userId);
      const hashedToken = hashToken(token);

      expect(typeof hashedToken).toBe('string');
      expect(hashedToken.length).toBe(64);
    });
  });
});
