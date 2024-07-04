// import { useState, useEffect } from 'react'
// import { auth, db } from './firebase'
// import { getDoc, doc } from 'firebase/firestore'
// import { toast } from 'react-toastify'
// // import { Navigate } from 'react-router-dom'

// function Profile() {
//     const [userDetails, setUserDetails] = useState(null)
//     // const [isLoading, setisLoading] = useState(true)

//     const fetchUserData = async () => {
//         auth.onAuthStateChanged(async (user) => {
//             const docRef = doc(db, 'users', user.uid)
//             const docSnap = await getDoc(docRef)
//             if (docSnap.exists()) {
//             setUserDetails(docSnap.data())
//             // setisLoading(false)
//             } else {
//             console.log('No user is logged in!')
//             window.location.href = '/login'
//             }
//         })
//     }
  
//     useEffect(() => {
//         document.title = 'FB&R | My Profile'
//         fetchUserData()
//     }, [])

//     async function handleLogOut() {
//         try {
//             await auth.signOut()
//             console.log('User has been logged out!')
//             window.location.href = '/'
//             toast.success('You have been logged out successfully!', {
//                 position: 'top-center'})
//         } catch (err) {
//             console.error(`Error: ${err.message}`)
//         }
//     }

//     return (
//     <article>
//     {userDetails ? (
//         <>
//             <h2>My Profile</h2>
//             <h3>Welcome back, {userDetails.firstName}</h3>
//             <div>
//             <p>Here are your details:</p>
//             <p>First Name: {userDetails.firstName}</p>
//             <p>Last Name: {userDetails.lastName}</p>
//             <p>Email: {userDetails.email}</p>
//             </div>
//             <p>You can hang out here and buy some crypto to HODL!!!</p>
            
//             <button onClick={handleLogOut}>Log out</button>
//     </>
//     ) : (
//         <p>Loading...</p>
//     )
//     // ) : (
//     //     <Navigate to="/login"/>
//     // )
//     }
//     </article>
//   )
// }

// export default Profile