import * as db from './services/db';
import type { User } from './services/db';

describe('DB Service', () => {
  beforeEach(async () => {
    await db.clearDb();
  });

  it('should create and retrieve a user', async () => {
    const testUser: User = { id: '1', name: 'Test User', email: 'test@test.com' };
    await db.createUser(testUser);
    
    const users = await db.getAllUsers();
    
    expect(users).toHaveLength(1);
    
    expect(users[0].name).toBe('Test USER');
  });

  it('should clear the database', async () => {
    const testUser: User = { id: '1', name: 'Test User', email: 'test@test.com' };
    await db.createUser(testUser);

    let users = await db.getAllUsers();
    expect(users).toHaveLength(1);

    await db.clearDb();
    users = await db.getAllUsers();
    expect(users).toHaveLength(0);
  });
});