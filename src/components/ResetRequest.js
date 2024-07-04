import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth, db } from './firebase'
import '../styles/login.css'
import { toast } from 'react-toastify'

function ResetRequest() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'FB&R | Request Pasword Reset'
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (email === '') {
        throw new Error('Email cannot be empty')
      }
      const userRef = collection(db, 'users')
      const q = query(userRef, where('email', '==', email))
      const querySnapshot = await getDocs(q);
      let user = null
      querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            user = doc.data()
        });
      console.log(user)
      console.log(email)
      if (!user) {
        throw new Error('No user is registered with that email. You must register first.')
      }
    
      await sendPasswordResetEmail(auth, email)
      toast.info('Password reset link has been sent to your email!', {
          position: 'top-center'})
      setEmail('')
    } catch (err) {
        // console.error(`Error: ${err.message}`)
        toast.error(`Error: ${err.message}`, {
            position: 'top-right'})
    }

  }

  return (
    <article className='loginContainer'>
        <div className='loginFormWrapper'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"
                value={email}
                placeholder='Enter email address'
                onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Request Reset</button>
                <p>Remember your password? Click <a href="/login">here</a> to log in</p>
            </form>
        </div>
    </article>
  )
}

export default ResetRequest