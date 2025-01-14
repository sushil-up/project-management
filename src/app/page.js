
"use client"
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    // Fetch data from the serverless function
    async function fetchData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data.users);
    }
    fetchData();
  }, []);

  const handleAddUser = async () => {
    const newUserData = { id: Date.now(), name: newUser };

    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: [...data, newUserData] }),
    });

    if (response.ok) {
      setNewUser('');
      const updatedData = await response.json();
      setData(updatedData.users);
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Add a user"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
