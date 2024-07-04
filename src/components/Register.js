import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import '../styles/signup.css'
import { toast } from 'react-toastify'
import SignupWithGoogle from './SignupWithGoogle'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'FB&R | Register'
  }, [])

  async function handleRegister(e) {
    e.preventDefault()
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        throw new Error('Message: Error Password and confirm password do not match')
      }

      const user = auth.currentUser
      // console.log(`User ${user.uid} has been registered successfully!`)
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          userId: user.uid
        })
      }
      toast.success('User has been registered successfully!', {
        position: 'top-right'})
      navigate('/login')
      // console.log(user)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      // console.error(`Error: ${err.message}`)
      toast.error(`Error: ${err.message.split(': Error')[1]}`, {
        position: 'top-right'})
    }
  }
  return (
    <article className='signupContainer'>
      <div className='signupFormWrapper'>
        <h2 className='signupLegend'>Register</h2>
        <form className='signupForm' onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} required />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Register</button>
            <p>Already registered? Log in <a href="/login">here</a></p>
            <SignupWithGoogle />
        </form>
        </div>
    </article>
  )
}

export default Register