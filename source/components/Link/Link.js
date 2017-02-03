import React from 'react';
import Router from 'rawblock/utils/router';

function navigate(e, {to}){
    Router.navigate(to);

    e.preventDefault();
}

function Link(props){
    return (
        <a
            href={props.to}
            onClick={(e) => navigate(e, props)}>
            {props.children}
        </a>
    );
}

export default Link;
