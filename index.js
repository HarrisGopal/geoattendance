/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
/* Redux */
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(AppRedux));
