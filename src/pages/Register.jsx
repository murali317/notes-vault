// import { useEffect, useState } from "react";

// function Register(){
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const validateForm = (e) => {
//         if (name.trim() === '') return 'Name is required!'
//         if (!email.includes('@')) return 'Invalid email format!'
//         if (password.length < 6) return 'Password must be atleast 6 characters!'
//         return '';
//     }

//     const [touched, setTouched] = useState({
//         name: false, email: false, password: false
//     });

//     useEffect(() => {
//         const err = validateForm();
//         if (touched.name || touched.email || touched.password){
//             setError(err)
//         }
//     }, [email, password, name, touched])


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const validateError = validateForm();
//         if (validateError){
//             setError(validateError);
//         }
//         setError('');
//         console.log('Registering the user: ', {name, email, password});
//     }

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>Register 📜</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Name:</label> 
//                     <input type="text" value={name} onChange={(e) => {
//                         setName(e.target.value)
//                         setTouched(prev => ({...prev, name: true}))
//                         }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Email:</label> 
//                     <input type="email" value={email} onChange={(e) => {
//                         setEmail(e.target.value)
//                         setTouched(prev => ({...prev, email: true}))
//                         }}/>
//                 </div>
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Password:</label> 
//                     <input type="password" value={password} onChange={(e) => {
//                         setPassword(e.target.value)
//                         setTouched(prev => ({...prev, password: true}))
//                         }}/>
//                 </div>
                
//                 {error && (
//                     <div style={{color:'red', marginBottom:'1rem'}}>{error}</div>
//                 )}

//                 <button type="submit" disabled={!!validateForm()}>Register</button>
//             </form>
//         </div>
//     )

// }

// export default Register;

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// import { useState } from "react";
// import { register } from "../services/authService"; // 👈 import fake backend

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 🔍 Step 1: Input validation logic
//   const validateForm = () => {
//     if (!name.trim()) return "Name is required";
//     if (!email.includes("@")) return "Invalid email";
//     if (password.length < 6) return "Password must be at least 6 characters";
//     return null;
//   };

//   // 🚀 Step 2: Form submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const result = register({ name, email, password });
//       console.log("Registered:", result); // ✅ registered user + token
//       setSuccess("Registered successfully!");
//     } catch (err) {
//       setError(err.message); // ❌ user exists or other error
//     }
//   };

//   // 🧱 Step 3: The JSX layout
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Register 👤</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Name:</label>
//           <br />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Email:</label>
//           <br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Password:</label>
//           <br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* 🛑 Show validation/backend error */}
//         {error && (
//           <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
//         )}

//         {/* ✅ Show success message */}
//         {success && (
//           <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>
//         )}

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// ------------------------------------------------------------------------------------------------------------------

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {auth} from '../firebase' // Import Auth instance
// import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate()

//   // 🔍 Step 1: Input validation logic
//   const validateForm = () => {
//     if (!name.trim()) return "Name is required";
//     if (!email.includes("@")) return "Invalid email";
//     if (password.length < 6) return "Password must be at least 6 characters";
//     return null;
//   };

//   // 🚀 Step 2: Form submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password); // as it returns a promise
//       await updateProfile(userCredential.user, { displayName: name });
//       setSuccess("Registered successfully!");
//       console.log("Registered:", userCredential.user); // ✅ registered user + token
//       navigate('/login'); // 👈 redirect to login after registering
//     } catch (err) {
//       setError(err.message); // ❌ user exists or other error
//     }
//   };

//   // 🧱 Step 3: The JSX layout
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Register 👤</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Name:</label>
//           <br />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Email:</label>
//           <br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Password:</label>
//           <br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* 🛑 Show validation/backend error */}
//         {error && (
//           <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
//         )}

//         {/* ✅ Show success message */}
//         {success && (
//           <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>
//         )}

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// ------------------- MESSY SATURDAY NIGHT --------------------

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // ✅ Save the whole Firebase user, not just email
      login(userCredential.user);

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
