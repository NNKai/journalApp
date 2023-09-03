import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
        await signInWithEmailAndPassword(auth ,email, password);
        console.log('User signed in successfully');
        navigate('/')
    } catch (error) {
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
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
      <button className="google-button" onClick={signInWithGoogle}>Sign in With google</button>
      <label >Not Registered? Click Below</label>
      <Link to='/signup' className='signup-button' >Sign Up</Link>
    </div>
  )
}

export default Login
