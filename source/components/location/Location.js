import React from 'react';
import {connect} from 'react-redux';
import Router from 'rawblock/utils/router';
import routesDescriptor from '../../routes/index';


class LocationComponent extends React.Component {

    constructor(){
        super();

        Router.applyRoutesIfNeeded();
    }

    componentDidMount(){
        Router.listen();
    }

    componentWillUnmount() {
        Router.unlisten();
    }

    getComponent(props){
        const {location} = props || this.props;
        const routes = routesDescriptor.routes;
        return location.isComplete && routes[location.routeName] && routes[location.routeName].component || null;
    }

    shouldComponentUpdate(nextProps){
        return !!this.getComponent(nextProps);
    }

    render(){
        const Component = this.getComponent();

        return Component ?
            (
                <Component></Component>
            ) :
            Component
        ;
    }
}

function mapStateToProps(state) {
    return {
        location: state.location,
    };
}

export default connect(mapStateToProps, null)(LocationComponent);
