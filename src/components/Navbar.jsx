import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // clear auth data
        navigate('/login') // redirect to login page
    }

    return(
        <nav style={{padding: "1rem",
        backgroundColor: "#f0f0f0",
        display: "flex",
        gap: "1rem",
        alignItems: "center"}}> {/* For static navigation UI like a nav bar, use <Link> not useNavigate() */}
            
            <div>
                {!user && (
                    <>
                        <Link to='/login'>Login</Link>
                        &nbsp;
                        <Link to='/register'>Register</Link>
                    </>
                )}
                {user && <Link to='/notes'>Dashboard</Link>} {/* Dashboard should only show if user is logged in */}
                
            </div>
            
            {user && ( // logout UI logic
                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", gap: "1rem" }}>
                    <button style={{color: 'red'}} onClick={handleLogout}>Logout 🔐</button>
                </div>
            )}


            {/* <Link to='/'>Home</Link> */}
            
            {/* {console.log('Navbar is rendering')} */}
        </nav>
    )
}
export default Navbar;