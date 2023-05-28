import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'

export default function FireAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => { // act as an type of EventListener
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();  //clean-up
  }, []);

  const logout = async () => {
    await auth.signOut()
  }

  const handlesignin = async () => {
    await signInWithEmailAndPassword(auth,email,password)
  }

  return (
    <>
      {
        user === null ?
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handlesignin}>Sign Up</button>
          </div> :
          <div>
          <div>{user.uid}</div>
          <button onClick={logout}>logout</button>
          </div>
      }
    </>
  );
}
