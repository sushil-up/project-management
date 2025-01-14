"use client"
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  // Fetch users on initial load
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users'); // Fetch from the serverless function
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const newUser = await res.json();
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setName(''); // Reset the input field
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new user name"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
