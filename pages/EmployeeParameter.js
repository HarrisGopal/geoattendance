/**
 * Sterlo Mobile library v1.0.0 (https://www.sterlo.io) 
 * Copyright 2022 Sterlo Platform Pvt Ltd. All rights reserved.
 * Module Name : Pages
 * Module Description : Runtime page activity will be handled using below functions
 */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Linking, Image, SafeAreaView,BackHandler, StatusBar, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreDatePicker from 'react-native-oreopscomponent/components/OreDatePicker';
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './EmployeeParameter_Config'; 
import {OreAlert,OreConfirmationAlert} from 'react-native-oreopscomponent/components/OreAlert';
import Oreframework from 'react-native-oreopscore/components/OreOPS/general/Ore_Framework';
import OreModelHandler from '../databinding/Ore_ModelHandler';
import OreApibinding from '../databinding/Ore_Databinding';
import OreDatabinding from '../databinding/Ore_Controlbinding';
import Spinner from 'react-native-loading-spinner-overlay';
import orethemebuilder from '../oreconfig/Ore_Themebuilder';
import Geolocation from '@react-native-community/geolocation';
import Moment from 'moment';

let OreStyle = orethemebuilder.getStylePath()
 
export default class EmployeeParameter extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
			 window.Page_01=this;
			this.state = {
				orepageproperty:PropertyJson,
				ParamJson: Paramjson,
				pagename: "Page_01",
				spinner: false,
				isvalid: true,
				GlobalVariables: GlobalVariables,
				ApiResponse:[],
				datamodal: OreApibinding.GetScreenModelData(Datamodel), 
			}
		}
	componentDidMount =async(evt)=>{
		    
		this.props.navigation.addListener('willFocus', async()=>{
		this.setState({ spinner: true })
		 window.Page_01 = this;
		Orefuncs.SetDate(this.state);
 setTimeout(async() => {
		await OreApibinding.GetScreenModelDataNew(this, Datamodel);
		 await OreApibinding.AutoBind(this);
		 this.setState({ spinner: false })
}, 100);
}) 
  BackHandler.addEventListener(
'hardwareBackPress',
this.handleBackButtonClick,
);  
	}
	 handleBackButtonClick= async ()=>{
 if (this.state.orepageproperty["Page_01"]["Default"]["canBackPress"] == "false")
	 {
	 if (this.props.navigation.isFirstRouteInParent())
	 {
	Orefuncs.AppTerminate();
	 }
	 else
	 {
	Orefuncs.NavigateBack(this.props.navigation);
	}
	return true;
	}
	 return true;
	}
	
 componentWillUnmount=()=>{
	BackHandler.removeEventListener(
	'hardwareBackPress',
	this.handleBackButtonClick,
	);
	}
	
	/* OreIcon : Icon_1; */
	Icon_1_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
	}
	/* OreDatePicker : DatePicker_1; */
	DatePicker_1_onDateChange= async (evt)=>{
		this.state.orepageproperty['DatePicker_1']["Property"]["defaultValue"]= evt; 
		this.setState({orepageproperty: this.state.orepageproperty});
		 this.state.orepageproperty['DatePicker_1']['Property']['serverValue'] =Orefuncs.getDateFormat(evt, Orefuncs.GetProperty('DatePicker_1', this.state, 'format'),Orefuncs.GetProperty('DatePicker_1', this.state, 'serverFormat'))
		
		}
	/* OreDatePicker : DatePicker_2; */
	DatePicker_2_onDateChange= async (evt)=>{
		this.state.orepageproperty['DatePicker_2']["Property"]["defaultValue"]= evt; 
		this.setState({orepageproperty: this.state.orepageproperty});
		 this.state.orepageproperty['DatePicker_2']['Property']['serverValue'] =Orefuncs.getDateFormat(evt, Orefuncs.GetProperty('DatePicker_1', this.state, 'format'),Orefuncs.GetProperty('DatePicker_1', this.state, 'serverFormat'))
		
		}
	/* OreButton : Button_2; */
	Button_2_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		 /* User Events */
		 
		this.setState({ spinner: false });
}


	/* OreButton : Button_3; */
	Button_3_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		 /* User Events */
		 
		this.setState({ spinner: false });
}



	callnanoflow = (evt) => {
		Orefuncs.callnanoflow(evt, this, Nanojson)
	}
render() {
	return (
		<ImageBackground imageStyle={{resizeMode: 'stretch'}} style={[OreStyle.PageStyle, this.state.orepageproperty['Page_01']["styles"]]} source={{uri:this.state.orepageproperty['Page_01']["Property"]["backgroundImage"]}}> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					<StatusBar translucent={false}/> 
				<View style ={ { height:Oreframework.getH(352,318,560)} }>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} viewStyle={this.state.orepageproperty['Icon_1']["viewStyle"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} onPress={this.Icon_1_onPress}/>:<View style={{ height: Oreframework.getH(24.625,318,560), width: Oreframework.getW(37.625,318,560), top: Oreframework.getH(8.9886,318,560), left: Oreframework.getW(1.99432,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} onPress={this.Icon_1_onPress}/></View>}
					<View style={{ height: Oreframework.getH(31.6719,318,560), width: Oreframework.getW(31.6719,318,560), top: Oreframework.getH(5.9659,318,560), left: Oreframework.getW(4.98295,318,560), position:'absolute', alignItems: 'center' }}><OreShapes style={this.state.orepageproperty['Square_1']["styles"]} viewStyle={this.state.orepageproperty['Square_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Square_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Square_1']["Property"]["source"]}}  property={this.state.orepageproperty['Square_1']["Property"]}/></View>
					<OreDatePicker style={this.state.orepageproperty['DatePicker_1']["styles"]} mode={this.state.orepageproperty['DatePicker_1']["Property"]["mode"]} disabled={this.state.orepageproperty['DatePicker_1']["Property"]["disabled"]} date={this.state.orepageproperty['DatePicker_1']["Property"]["defaultValue"]} pickerstyle={this.state.orepageproperty['DatePicker_1']["Property"]["datepickerstyle"]} showIcon={this.state.orepageproperty['DatePicker_1']["Property"]["showIcon"]} is24Hour={this.state.orepageproperty['DatePicker_1']["Property"]["is24Hour"]} format={this.state.orepageproperty['DatePicker_1']["Property"]["format"]}   iconstyle={this.state.orepageproperty['DatePicker_1']["Property"]["iconPosition"]} iconsize={30} iconname={this.state.orepageproperty['DatePicker_1']["Property"]["icon"]} iconcolor={this.state.orepageproperty['DatePicker_1']["Property"]["iconColor"]} dateInput={this.state.orepageproperty['DatePicker_1']["dateInput"]} dateText={this.state.orepageproperty['DatePicker_1']["dateText"]} allowFontScaling={this.state.orepageproperty['DatePicker_1']["Property"]["allowFontScaling"]} androidMode={this.state.orepageproperty['DatePicker_1']["Property"]["androidMode"]} iconnpmtype={this.state.orepageproperty['DatePicker_1']["Property"]["iconnpmtype"]} textStyle={this.state.orepageproperty['DatePicker_1']["textStyle"]} viewStyle={this.state.orepageproperty['DatePicker_1']["viewStyle"]} title={this.state.orepageproperty['DatePicker_1']["title"]} inputRef={(input) => {this.DatePicker_1 = input}} onDateChange={this.DatePicker_1_onDateChange}/>
					<OreDatePicker style={this.state.orepageproperty['DatePicker_2']["styles"]} mode={this.state.orepageproperty['DatePicker_2']["Property"]["mode"]} disabled={this.state.orepageproperty['DatePicker_2']["Property"]["disabled"]} date={this.state.orepageproperty['DatePicker_2']["Property"]["defaultValue"]} pickerstyle={this.state.orepageproperty['DatePicker_2']["Property"]["datepickerstyle"]} showIcon={this.state.orepageproperty['DatePicker_2']["Property"]["showIcon"]} is24Hour={this.state.orepageproperty['DatePicker_2']["Property"]["is24Hour"]} format={this.state.orepageproperty['DatePicker_2']["Property"]["format"]}   iconstyle={this.state.orepageproperty['DatePicker_2']["Property"]["iconPosition"]} iconsize={30} iconname={this.state.orepageproperty['DatePicker_2']["Property"]["icon"]} iconcolor={this.state.orepageproperty['DatePicker_2']["Property"]["iconColor"]} dateInput={this.state.orepageproperty['DatePicker_2']["dateInput"]} dateText={this.state.orepageproperty['DatePicker_2']["dateText"]} allowFontScaling={this.state.orepageproperty['DatePicker_2']["Property"]["allowFontScaling"]} androidMode={this.state.orepageproperty['DatePicker_2']["Property"]["androidMode"]} iconnpmtype={this.state.orepageproperty['DatePicker_2']["Property"]["iconnpmtype"]} textStyle={this.state.orepageproperty['DatePicker_2']["textStyle"]} viewStyle={this.state.orepageproperty['DatePicker_2']["viewStyle"]} title={this.state.orepageproperty['DatePicker_2']["title"]} inputRef={(input) => {this.DatePicker_2 = input}} onDateChange={this.DatePicker_2_onDateChange}/>
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_1']["styles"]}  title={this.state.orepageproperty['Text_1']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_1']["Property"]["disabled"]} property={this.state.orepageproperty['Text_1']["Property"]} numberOfLines={this.state.orepageproperty['Text_1']["Property"]["numberOfLines"]} />
					<OreButton controlid='10006' controlname='Button_2' disabled={this.state.orepageproperty['Button_2']["Property"]["disabled"]} style={this.state.orepageproperty['Button_2']["styles"]} property={this.state.orepageproperty['Button_2']["Property"]} textstyle={this.state.orepageproperty['Button_2']["textstyle"]} title={this.state.orepageproperty['Button_2']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_2']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_2 = input}} onPress={this.Button_2_onPress} />
					<OreButton controlid='10007' controlname='Button_3' disabled={this.state.orepageproperty['Button_3']["Property"]["disabled"]} style={this.state.orepageproperty['Button_3']["styles"]} property={this.state.orepageproperty['Button_3']["Property"]} textstyle={this.state.orepageproperty['Button_3']["textstyle"]} title={this.state.orepageproperty['Button_3']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_3']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_3 = input}} onPress={this.Button_3_onPress} />
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
