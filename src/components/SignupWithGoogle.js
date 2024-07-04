import React from 'react'
import '../styles/google.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SignupWithGoogle() {
    const navigate = useNavigate()

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            if (user) {
                await setDoc(doc(db, 'users', user.uid), {
                    firstName: user.displayName.split(' ')[0],
                    lastName: user.displayName.split(' ')[1],
                    email: user.email,
                    userId: user.uid,
                    photo: user.photoURL
                  })
                toast.success('You have been logged in successfully!', {
                    position: 'top-center'})
                navigate('/profile')
            }
        }).catch((err) => {
            // console.log(`Error: ${err.message}`)
            toast.error(`Error: ${err.message.split(': Error')[1]}`, {
                position: 'top-right'})
    })
}
  return (
    <div className='googleDiv'>
        <p>-- Or --</p>
        {/* <img src={require("../assets/images/google/web_light_rd_SI@4x.png")} /> */}
        <img src={require("../assets/images/google/web_neutral_rd_SU@1x.png")} onClick={googleLogin}/>
    </div>
  )
}

export default SignupWithGoogle
