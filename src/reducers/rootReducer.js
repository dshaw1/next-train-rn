import { combineReducers } from 'redux';

import journeys from './journeys';
import network from './network';

const rootReducer = combineReducers({
	journeys,
	network
});

export default rootReducer;