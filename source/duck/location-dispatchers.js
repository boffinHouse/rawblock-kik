import {bindActionCreators} from 'redux';
import * as Actions from './location';

export default function createLocationDispatcher(dispatch){
    return bindActionCreators(Actions, dispatch);
}
