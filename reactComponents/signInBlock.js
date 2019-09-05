import React from 'react';
import Link from 'next/link';

class SignIn extends React.Component {
    render() {

        
        return <div>
            <form action="/login" method="post">
                <label>Username</label>
                <input type="text" name="username" default="Username" />

                <label>Password</label>
                <input type="password" name="password" default="" />

                <input type="submit" value="Login" />
            </form>

            <Link href="/signup" ><a>Sign Up</a></Link>
        </div>;
    
    }
}

export default SignIn;