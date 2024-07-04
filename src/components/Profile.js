import { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    const fetchUserData = () => {
        auth && auth.onAuthStateChanged( async (user) => {
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setUserDetails(docSnap.data())
            } else {
            console.log('No user is logged in!')
            navigate('/login')
            throw new Error('No user is logged in!')
            }            
        })
    }
  
    useEffect(() => {
        document.title = 'FB&R | My Profile'
        fetchUserData()
    }, [])

    function handleLogOut() {
        try {
            signOut(auth)
            // console.log('User has been logged out!')
            navigate('/')
            toast.info('You have been logged out successfully!', {
                position: 'top-center'})
        } catch (err) {
            // if (err.message === 'SIGTERM') {
            //     toast.info('You have been logged out successfully!', {
            //         position: 'top-center'})
            // } else {
            toast.error(`Error: ${err.message}`, {
                position: 'top-right'
                })
        }
    }

    return (
    <article>
    {userDetails ? (
        <>
            <h2>My Profile</h2>
            <div style={{ display: "flex", justifyContent: "left" }}>
                {userDetails.photo ? (
                <img src={userDetails.photo}
                width={"2%"}
                style={{ borderRadius: "50%" }} />
                ) : (
                <img src={require("../assets/images/default_pp.jpg")}
                width={"2%"}
                style={{ borderRadius: "50%" }} />
                )}

            </div>
            <h3>Welcome back, {userDetails.firstName}</h3>
            <div>
            <p>Here are your details:</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Email: {userDetails.email}</p>
            <p>User ID: {userDetails.userId}</p>
            </div>
            <p>You can hang out here and buy some crypto to HODL!!!</p>
            
            <button onClick={handleLogOut}>Log out</button>
    </>
    ) : (
        <p>Loading...</p>
    )}
    </article>
  )
}

export default Profile
