import * as db from './db';
import type { User } from './db';

export async function importUsers(users: User[]) {
  console.log(`Starting import for ${users.length} users...`);

  users.forEach(async (user) => {
    try {
      await db.createUser(user);
      console.log(`Successfully created user: ${user.name}`);
    } catch (error: any) {
      console.error(`Failed to create user ${user.name}: ${error.message}`);
    }
  });

  console.log('Import function finished executing.');
  return { success: true, message: "Import request received." };
}