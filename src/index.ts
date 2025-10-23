import express from 'express';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import * as importService from './services/importService';
import * as db from './services/db';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/import', async (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).send({ error: 'filePath is required' });
  }

  try {
    // Resolve file path relative to the project root
    const fullPath = path.resolve(process.cwd(), filePath);

    // 1. Read the file
    const fileContent = await fs.readFile(fullPath, 'utf8');
    
    // 2. Parse the CSV
    const users = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // 3. Call the import service
    const result = await importService.importUsers(users);
    
    res.status(200).json(result);

  } catch (error: any) {
    console.error('Error in /import endpoint:', error);
    res.status(500).json({ error: 'Failed to process import', message: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to get users', message: error.message });
  }
});


// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export the app for testing
export { app };