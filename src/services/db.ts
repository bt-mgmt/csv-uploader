export type User = {
  id: string;
  name: string;
  email: string;
};

const db = new Map<string, User>();
let activeConnections = 0;
const MAX_CONNECTIONS = 5;

/**
 * Simulates a database call to create a user.
 */
export async function createUser(user: User): Promise<User> {
  if (activeConnections >= MAX_CONNECTIONS) {
    throw new Error("Connection pool exhausted");
  }
  activeConnections++;

  try {
    await new Promise(res => setTimeout(res, 50));

    const [firstName, lastName] = user.name.split(' ');

    if (!lastName) {
      throw new Error("Invalid name format: must include first and last name.");
    }

    const processedName = `${firstName} ${lastName.toUpperCase()}`;
    const processedUser = { ...user, name: processedName };
    
    console.log(`DB: Processing ${processedName}`);
    db.set(user.id, processedUser);
    return processedUser;
  } finally {
    activeConnections--;
  }
}

/**
 * Simulates a database call to get all users.
 */
export async function getAllUsers(): Promise<User[]> {
  await new Promise(res => setTimeout(res, 20));
  return Array.from(db.values());
}

/**
 * Clears the database. Used for testing.
 */
export async function clearDb(): Promise<void> {
  db.clear();
}