import {Routes,Route,NavLink} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import "../style.css"
function Auth()
{
    return(
        <div class="auth">
        <div class="authnav">
            <NavLink to="/auth/signin" className={({isActive})=>isActive?"authnavin active":"authnavin"}>Sign In</NavLink>
            <NavLink to="/auth/signup" className={({isActive})=>isActive?"authnavin active":"authnavin"}>Sign Up</NavLink>
            <Routes>
                <Route path="/signin" element={<Signin />}/>
                <Route path="/signup" element={<Signup />}/>
            </Routes>
        </div>
        </div>
    );
}

export default Auth;