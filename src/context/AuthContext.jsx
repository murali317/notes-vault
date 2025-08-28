// import { createContext, useContext, useState } from "react";

// // 1️⃣ Create a new context
// const AuthContext = createContext();

// // 2️⃣ This component will wrap your whole app and provide auth info to every page
// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem('user'); // Try to load user from localStorage
//         return savedUser ? JSON.parse(savedUser) : null; // If found, parse it. Else, null
//     })

//     const login = (email) => {
//         setUser({email}) // save user in state
//         localStorage.setItem('user', JSON.stringify({email})) // save user in localstorage
//     }

//     const logout = () => { // clears everything
//         setUser(null);
//         localStorage.removeItem('user');
//     }

//     // 3️⃣ Return the provider — allows all children to use this auth data/functions
//     return(
//         <AuthContext.Provider value={{user, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// // 5️⃣ Custom hook to use auth in other components easily
// export const useAuth = () => useContext(AuthContext);

// --------------- MESSY SAT EVENING ---------------------------


import { createContext, useContext, useState } from "react";

// 1️⃣ Create a new context
const AuthContext = createContext();

// 2️⃣ This component will wrap your whole app and provide auth info to every page
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user'); // Try to load user from localStorage
        return savedUser ? JSON.parse(savedUser) : null; // If found, parse it. Else, null
    });

    // ✅ login now stores the FULL firebase user object
    const login = (firebaseUser) => {
        setUser(firebaseUser);
        localStorage.setItem('user', JSON.stringify(firebaseUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// 5️⃣ Custom hook to use auth in other components easily
export const useAuth = () => useContext(AuthContext);
