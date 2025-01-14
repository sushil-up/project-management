// /pages/api/data.js
import { writeFile, readFileSync } from 'fs';
import path from 'path';

// Define the path to the local JSON file
const dataFilePath = path.resolve('data.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch the data
    try {
      const data = readFileSync(dataFilePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ message: 'Failed to read data' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to update the data
    try {
      const newData = req.body;  // New data to save
      writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to write data' });
        } else {
          res.status(200).json({ message: 'Data updated successfully' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
