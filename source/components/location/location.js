import React from 'react';
// import { bindActionCreators } from 'redux';
// import {connect} from 'react-redux';
//
// import * as LocationActions from '../../actions/location';


// import deserialize from 'rawblock/utils/deserialize';


class Location extends React.Component {

    constructor(){
        super();

        this.onPopstate = this.onPopstate.bind(this);
    }

    onPopstate(){

    }

    componentDidMount(){
        window.addEventListener('popstate', this.onPopstate);
    }

    componentWillUnmount(){
        window.removeEventListener('popstate', this.onPopstate);
    }

    render(){
        return this.props.children ? this.props.children : null;
    }
}

// function mapStateToProps(){
//
// }
//
// function mapDispatchToProps(){
//
// }
//
// connect();

export default Location;
