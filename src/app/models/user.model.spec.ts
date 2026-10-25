import { User } from './user.model';

describe('User', () => {
  it('should define a user', () => {
    const user = new User();
    user.Username = 'test-user';
    user.Password = 'test-password';
    expect(user.Username).toBe('test-user');
    expect(user.Password).toBe('test-password');
  });
});
