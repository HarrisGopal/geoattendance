import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, Header} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { configureFontAwesomePro } from "react-native-fontawesome-pro";
import { YellowBox } from 'react-native';






 import Defaultsplash from './pages/Defaultsplash';
 import Login from './pages/Login';
 import Homepage from './pages/Homepage';
 import Forgotpassword from './pages/Forgotpassword';
 import RecordAttendance from './pages/RecordAttendance';
 import Settings from './pages/Settings';
 import AdminParameterPage from './pages/AdminParameterPage';
 import EmployeeParameter from './pages/EmployeeParameter';
 import ManageDevice from './pages/ManageDevice';
 import EmployeeReportPage from './pages/EmployeeReportPage';
 import Profile from './pages/Profile';
 import EmployeeWise from './pages/EmployeeWise';
 import ProductWise from './pages/ProductWise';
 import EmployeeWiseAdmin from './pages/EmployeeWiseAdmin';
 import Index from './pages/Index';



const App = createStackNavigator(
  {
    
	Defaultsplash:{screen:Defaultsplash,navigationOptions: () => ({headerShown: false,})},
	Login:{screen:Login,navigationOptions: () => ({headerShown: false,})},
	Homepage:{screen:Homepage,navigationOptions: () => ({headerShown: false,})},
	Forgotpassword:{screen:Forgotpassword,navigationOptions: () => ({headerShown: false,})},
	RecordAttendance:{screen:RecordAttendance,navigationOptions: () => ({headerShown: false,})},
	Settings:{screen:Settings,navigationOptions: () => ({headerShown: false,})},
	AdminParameterPage:{screen:AdminParameterPage,navigationOptions: () => ({headerShown: false,})},
	EmployeeParameter:{screen:EmployeeParameter,navigationOptions: () => ({headerShown: false,})},
	ManageDevice:{screen:ManageDevice,navigationOptions: () => ({headerShown: false,})},
	EmployeeReportPage:{screen:EmployeeReportPage,navigationOptions: () => ({headerShown: false,})},
	Profile:{screen:Profile,navigationOptions: () => ({headerShown: false,})},
	EmployeeWise:{screen:EmployeeWise,navigationOptions: () => ({headerShown: false,})},
	ProductWise:{screen:ProductWise,navigationOptions: () => ({headerShown: false,})},
	EmployeeWiseAdmin:{screen:EmployeeWiseAdmin,navigationOptions: () => ({headerShown: false,})},
	Index:{screen:Index,navigationOptions: () => ({headerShown: false,})},
	O433252:{screen:Defaultsplash,navigationOptions: () => ({headerShown: false,})},
	O433255:{screen:Login,navigationOptions: () => ({headerShown: false,})},
	O433261:{screen:Homepage,navigationOptions: () => ({headerShown: false,})},
	O433274:{screen:Forgotpassword,navigationOptions: () => ({headerShown: false,})},
	O433277:{screen:RecordAttendance,navigationOptions: () => ({headerShown: false,})},
	O433287:{screen:Settings,navigationOptions: () => ({headerShown: false,})},
	O433289:{screen:AdminParameterPage,navigationOptions: () => ({headerShown: false,})},
	O433291:{screen:EmployeeParameter,navigationOptions: () => ({headerShown: false,})},
	O433293:{screen:ManageDevice,navigationOptions: () => ({headerShown: false,})},
	O433295:{screen:EmployeeReportPage,navigationOptions: () => ({headerShown: false,})},
	O433333:{screen:Profile,navigationOptions: () => ({headerShown: false,})},
	O433946:{screen:EmployeeWise,navigationOptions: () => ({headerShown: false,})},
	O433948:{screen:ProductWise,navigationOptions: () => ({headerShown: false,})},
	O434099:{screen:EmployeeWiseAdmin,navigationOptions: () => ({headerShown: false,})},
	O433250:{screen:Index,navigationOptions: () => ({headerShown: false,})},
    
  }
  
);



  configureFontAwesomePro();
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.disableYellowBox = true;

export default createAppContainer(App)