// import { useState } from "react";
// import {useNavigate} from 'react-router-dom'
// import {useAuth} from '../context/AuthContext'
// import {auth} from '../firebase' // Import Auth instance
// import { signInWithEmailAndPassword } from "firebase/auth";

// // function Login(){
// //     const [email, setEmail] = useState(''); // ✅ Controls email field
// //     const [password, setPassword] = useState(''); // ✅ Controls email field
// //     const [error, setError] = useState('')

// //     const {login} = useAuth(); // get login function from AuthContext.jsx
// //     const navigate = useNavigate(); // to redirect after login

// //     const validateForm = () => {
// //         if (!email.includes('@')) return 'Invalid email'
// //         if (password.length < 6) return 'Password must be at least 6 characters'
// //     }

// //     const handleSubmit = (e) => {
// //         e.preventDefault(); // 🛑 Stops page from reloading
        
// //         const validateError = validateForm();
// //         if (validateError){
// //             setError(validateError)
// //             return;
// //         }
// //         setError('')
// //         login(email); // store user emain in context & localstorage
// //         navigate('/notes') // redirect after successful login
// //         console.log('Logging in with ', {email, password}) // on submit, it prints them to console to test.
// //     }

// //     return(
// //         <div style={{ padding: "2rem" }}>
// //             <h2>Login Page 🔏</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div style={{ marginBottom: "1rem" }}>
// //                     <label>Email: </label> <br /> 
// //                     <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
// //                 </div>

// //                 <div style={{ marginBottom: "1rem" }}>
// //                     <label>Password: </label> <br />
// //                     <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
// //                 </div>

// //                 {error && (
// //                     <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
// //                 )}

// //                 <button type="submit" disabled={!!validateForm()}>Login</button>
// //             </form>
// //         </div>
// //     )
// // }

// // export default Login;

// // ------------------------------------------------------------------------------------
// // UNTIL now, we're not really checking credentials with Firebase, you’re only storing the email locally.
// // AUTHENTICATE WITH FIREBASE
// // ------------------------------------------------------------------------------------

// function Login(){
//     const [email, setEmail] = useState(''); // ✅ Controls email field
//     const [password, setPassword] = useState(''); // ✅ Controls email field
//     const [error, setError] = useState('')

//     const {login} = useAuth(); // get login function from AuthContext.jsx
//     const navigate = useNavigate(); // to redirect after login

//     const validateForm = () => {
//         if (!email.includes('@')) return 'Invalid email'
//         if (password.length < 6) return 'Password must be at least 6 characters'
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // 🛑 Stops page from reloading
        
//         const validateError = validateForm();
//         if (validateError){
//             setError(validateError)
//             return;
//         }
//         setError('')

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             login(userCredential.user.email); // Save user in context
//             navigate('/notes');
//             console.log('logged in:', userCredential.user.email); // ✅ logged in user + token
//         }
//         catch (err){
//             setError(err.message);
//             console.log('login error:', err.message);
//         }
//     }

//     return(
//         <div style={{ padding: "2rem" }}>
//             <h2>Login Page 🔏</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Email: </label> <br /> 
//                     <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//                 </div>

//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Password: </label> <br />
//                     <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//                 </div>

//                 {error && (
//                     <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
//                 )}

//                 <button type="submit" disabled={!!validateForm()}>Login</button>
//             </form>
//         </div>
//     )
// }

// export default Login;

// --------------- MESSY SAT EVENING ---------------------------


import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // ✅ Save the whole Firebase user, not just email
      login(userCredential.user);

      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
