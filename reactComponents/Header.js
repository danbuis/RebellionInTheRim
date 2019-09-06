import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
    render() {
        
        
        return <div>
            <Link href="/" ><a>HOME</a></Link>
            <Link href="/campaign"><a>Campaign</a></Link>
            <Link href="/commander"><a>Commander</a></Link>
            <Link href="/profile"><a>Profile</a></Link>
        </div>;
    
    }
}

export default Header;