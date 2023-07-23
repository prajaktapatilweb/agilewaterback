import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './Common';
import Dashboard from './Dashboard';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  dashboard: Dashboard,
});
export default reducers;
