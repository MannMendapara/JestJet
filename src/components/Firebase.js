import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Firebase() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const createUserInDB = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: name,
        age: age,
      });
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={createUserInDB}>Create</button>
      </div>
    </div>
  );
}
