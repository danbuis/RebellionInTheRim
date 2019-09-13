import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
    loggedInStatus = () => {
        console.log("testing logged status")
        if(!this.props.user){
            return <p>Future login link"</p>
        }else {
            return <p>Welcome {this.props.user.username}</p>
        }
    }

    render() {
        
        
        return <div>
            <Link href="/" ><a>HOME</a></Link>

        </div>;
    
    }
}

export default Header;