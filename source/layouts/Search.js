import '../app';
import React from 'react';
import Link from '../components/Link/Link';

function Search(){
    return (
        <div>Search <Link to="/search?foo=bar2">Testa</Link></div>
    );
}

export default Search;


