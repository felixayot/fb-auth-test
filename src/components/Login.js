import { useState, useEffect } from 'react'
import '../styles/login.css'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import SigninWithGoogle from './SigninWithGoogle'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'FB&R | Log in'
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      // console.log(`User ${user.uid} has been logged in successfully!`)
      toast.success('You have been logged in successfully!', {
        position: 'top-center'})
      navigate('/profile')
      console.log(user)
      setEmail('')
      setPassword('')
    } catch (err) {
      // console.error(`Error: ${err.message}`)
      toast.error(`Error: ${err.message.split(': Error')[1]}`, {
        position: 'top-right'})
    }
  }
  return (
    <article className='loginContainer'>
      <div className='loginFormWrapper'>
        <h2 className='loginLegend'>Log in</h2>
        <form className='loginForm' onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Log in</button>
            <p>Forgot password? Click <a href="/request_password_reset">here</a> to reset</p>
            <p>Not registered? Sign up <a href="/register">here</a></p>
            <SigninWithGoogle />
        </form>
        </div>
    </article>
  )
}

export default Login
