import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase';
import { createUserWithEmailAndPassword,  signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.scss'

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      await updateProfile(user, { displayName });

      console.log('User created successfully');
      window.location('/')
      setDisplayName("")
      setEmail("")
      setPassword("")
      
    }catch (error) {
      setError(error.message);
    }
    
  };



  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Display Name</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      <button className='google-button' onClick={signInWithGoogle}>Sign up With google</button>
    </div>
  );
}

export default Signup;

