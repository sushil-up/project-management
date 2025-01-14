// pages/api/users.js

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  
  // GET: Fetch all users
  export async function handler(req, res) {
    if (req.method === 'GET') {
      // Send current users as response
      res.status(200).json(users);
    }
  
    // POST: Add a new user
    else if (req.method === 'POST') {
      const { name } = req.body;
      const id = Date.now(); // Simple way to create a unique ID
      const newUser = { id, name };
      users.push(newUser);
  
      // Respond with the newly added user
      res.status(201).json(newUser);
    }
  
    // If method is not GET or POST, return 405 (Method Not Allowed)
    else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  