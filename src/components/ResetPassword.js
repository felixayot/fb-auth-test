import { useState, useEffect } from 'react'
import { updatePassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import '../styles/signup.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'FB&R | Reset Password'
  }, [])

  async function handleReset(e) {
    e.preventDefault()
    // const user = auth.currentUser
    const userRef = collection(db, 'users')
    const q = query(userRef, where('email', '==', email))
    const querySnapshot = await getDocs(q);
    let user = null
    querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          user = doc.data()
      });
    try {
      if (password === confirmPassword) {
        await updatePassword(user, password)
        // console.log('Proceed to reset password')
      } else {
        throw new Error('Password and confirm password do not match')
      }
      toast.success('Password has been reset successfully! You can now log in with your new password', {
        position: 'top-right'})
      navigate('/login')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: 'top-right'})
    }
  }
  return (
    <article className='signupContainer'>
      <div className='signupFormWrapper'>
        <h2 className='signupLegend'>Reset Password</h2>
        <form className='signupForm' onSubmit={handleReset}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"
            value={email}
            placeholder='Enter email address'
            onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Reset</button>
            <p>Didn't request a reset? Ignore this and <a href="/login">log in</a> instead</p>
        </form>
        </div>
    </article>
  )
}

export default ResetPassword
