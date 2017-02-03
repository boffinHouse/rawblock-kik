import '../app';
import React from 'react';
import Link from '../components/Link/Link';

function Home(){
    return (
        <div>Home <Link to="/search?foo=bar">Test</Link></div>
    );
}

export default Home;


